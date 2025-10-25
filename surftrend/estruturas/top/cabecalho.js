/* ============================================
   VANCOUVER TEMPLATE - TOPO JAVASCRIPT
   Interações do Header Principal
   ============================================ */

(function($) {
    'use strict';

    /* ============================================
       MENU MOBILE
       ============================================ */
    
    // Abrir menu mobile
    $('.nav-mobile-toggle').on('click', function() {
        $('.nav-mobile-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
        $(this).attr('aria-expanded', 'true');
    });

    // Fechar menu mobile
    $('.nav-mobile-close, .cart-overlay').on('click', function() {
        $('.nav-mobile-overlay').removeClass('active');
        $('body').css('overflow', '');
        $('.nav-mobile-toggle').attr('aria-expanded', 'false');
    });

    // Toggle submenu mobile
    $('.nav-mobile-item.has-submenu > .nav-mobile-link').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('active').siblings().removeClass('active');
    });

    /* ============================================
       BUSCA
       ============================================ */
    
    // Auto-complete de busca (se necessário)
    var searchTimeout;
    $('.search-input').on('keyup', function() {
        var query = $(this).val();
        
        clearTimeout(searchTimeout);
        
        if (query.length >= 3) {
            searchTimeout = setTimeout(function() {
                // Aqui você pode implementar busca ao vivo/autocomplete
                // $.get('/busca-ajax/', {q: query}, function(data) {
                //     // Mostrar sugestões
                // });
            }, 300);
        }
    });

    /* ============================================
       CARRINHO SUSPENSO
       ============================================ */
    
    // Abrir carrinho suspenso
    $('.cart-link.cart-suspended').on('click', function(e) {
        e.preventDefault();
        
        // Carregar conteúdo do carrinho
        loadSuspendedCart();
        
        $('.suspended-cart').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    // Fechar carrinho suspenso
    $('.cart-overlay').on('click', function() {
        $('.suspended-cart').removeClass('active');
        $('body').css('overflow', '');
    });

    // Função para carregar carrinho suspenso
    function loadSuspendedCart() {
        $.post('load-widget.php', {
            widget: 'widgets/carrinho-suspenso.html'
        }, function(data) {
            $('.suspended-cart .cart-content').html(data);
        });
    }

    /* ============================================
       SCROLL BEHAVIOR
       ============================================ */
    
    var lastScroll = 0;
    var header = $('.header-main');
    var headerHeight = header.outerHeight();

    $(window).on('scroll', function() {
        var currentScroll = $(this).scrollTop();

        // Adicionar sombra ao header quando rolar
        if (currentScroll > 0) {
            header.addClass('scrolled').css('box-shadow', 'var(--sombra-media)');
        } else {
            header.removeClass('scrolled').css('box-shadow', 'none');
        }

        // Esconder/mostrar header ao rolar (opcional)
        // if (currentScroll > lastScroll && currentScroll > headerHeight) {
        //     header.css('transform', 'translateY(-100%)');
        // } else {
        //     header.css('transform', 'translateY(0)');
        // }

        lastScroll = currentScroll;
    });

    /* ============================================
       SUBMENU DESKTOP
       ============================================ */
    
    // Ajustar posição do submenu para não sair da tela
    $('.nav-item.has-submenu').on('mouseenter', function() {
        var submenu = $(this).find('.nav-submenu');
        var submenuOffset = submenu.offset();
        var submenuWidth = submenu.outerWidth();
        var windowWidth = $(window).width();

        if (submenuOffset && (submenuOffset.left + submenuWidth > windowWidth)) {
            submenu.css({
                'left': 'auto',
                'right': 0
            });
        }
    });

    /* ============================================
       ATUALIZAR DADOS DO HEADER DINAMICAMENTE
       ============================================ */
    
    // Atualizar informações do usuário
    function updateUserInfo() {
        $.post('action.php', {funcao: 'userdata'}, function(data) {
            if (data.logged === '1') {
                // Atualizar nome do usuário
                var firstName = data.data.nome.split(' ')[0];
                $('.account-text small').text('Olá, ' + firstName);
            }
        }, 'json');
    }

    // Atualizar contador do carrinho
    function updateCartCounter() {
        $.post('action.php', {funcao: 'cart_info'}, function(data) {
            if (data.success) {
                var totalItems = data.total_items || 0;
                var $cartCount = $('.cart-count');
                
                $cartCount.text(totalItems);
                
                if (totalItems > 0) {
                    $cartCount.addClass('has-items');
                } else {
                    $cartCount.removeClass('has-items');
                }
            }
        }, 'json');
    }

    // Listeners para eventos da WBUY
    readListener('onAddProductCart', function() {
        updateCartCounter();
        
        // Abrir carrinho suspenso automaticamente (se habilitado)
        if ($('.cart-link').hasClass('cart-suspended')) {
            loadSuspendedCart();
            $('.suspended-cart').addClass('active');
            $('body').css('overflow', 'hidden');
        }
    });

    readListener('totalItensCarrinho', function(total) {
        var $cartCount = $('.cart-count');
        $cartCount.text(total || 0);
        
        if (total > 0) {
            $cartCount.addClass('has-items');
        } else {
            $cartCount.removeClass('has-items');
        }
    });

    /* ============================================
       INICIALIZAÇÃO
       ============================================ */
    
    $(document).ready(function() {
        // Atualizar informações ao carregar
        updateUserInfo();
        updateCartCounter();

        // Fechar modais ao pressionar ESC
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                $('.nav-mobile-overlay').removeClass('active');
                $('.suspended-cart').removeClass('active');
                $('body').css('overflow', '');
            }
        });

        // Prevenir zoom no iOS ao focar input
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            $('.search-input').attr('autocapitalize', 'off');
        }
    });

})(jQuery);
