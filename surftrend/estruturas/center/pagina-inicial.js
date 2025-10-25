/**
 * ================================================
 * HOME PAGE JAVASCRIPT - VANCOUVER TEMPLATE
 * ================================================
 * Scripts específicos para a página inicial
 * Inclui carrosséis, animações e interações
 */

(function($) {
    'use strict';

    /**
     * Configurações Globais
     */
    const HOME = {
        // Configurações de carrossel padrão
        owlDefaults: {
            loop: false,
            margin: 15,
            nav: true,
            dots: true,
            autoplay: false,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            navText: [
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"/></svg>',
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/></svg>'
            ]
        },

        // Duração da animação do slide principal
        slideTimeout: 6000
    };

    /**
     * Inicialização quando o DOM estiver pronto
     */
    $(function() {
        initBannerPrincipal();
        initBannerCentral();
        initBannerPersonalizado();
        initVitrines();
        initWidgetAvaliacoes();
        initWidgetMarcas();
        initWidgetBlog();
        initWidgetInstagram();
        initSmartHint();
        initLazyLoading();
        initScrollAnimations();
    });

    /**
     * Banner Principal / Slider da Home
     */
    function initBannerPrincipal() {
        const $slider = $('#home-slide');
        
        if ($slider.length === 0) return;

        // Verifica se tem mais de um slide
        const itemCount = $slider.find('.item').length;
        
        if (itemCount <= 1) {
            $slider.find('.item:first').show();
            return;
        }

        // Inicializa Owl Carousel
        $slider.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: HOME.slideTimeout,
            autoplayHoverPause: true,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            navText: HOME.owlDefaults.navText,
            onInitialized: onSlideInit,
            onTranslate: onSlideTranslate,
            onTranslated: onSlideTranslated
        });

        /**
         * Callbacks do Slider
         */
        function onSlideInit() {
            // Inicia animação no primeiro dot
            $slider.find('.owl-dot.active')
                .css('animation', `progress ${HOME.slideTimeout / 1000}s linear forwards`);
        }

        function onSlideTranslate() {
            // Reseta animação dos dots
            $slider.find('.owl-dot')
                .css('animation', 'none');
        }

        function onSlideTranslated() {
            // Inicia animação no dot ativo
            $slider.find('.owl-dot.active')
                .css('animation', `progress ${HOME.slideTimeout / 1000}s linear forwards`);
        }
    }

    /**
     * Banner Central (3 colunas)
     */
    function initBannerCentral() {
        const $wrapper = $('#banner-central .wrapper');
        
        if ($wrapper.length === 0) return;

        const itemCount = $wrapper.find('.item').length;
        
        // Só inicializa carrossel se tiver mais de 3 itens
        if (itemCount <= 3) return;

        $wrapper.owlCarousel({
            loop: false,
            margin: 20,
            nav: true,
            dots: false,
            navText: HOME.owlDefaults.navText,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });
    }

    /**
     * Banner Personalizado (Categorias)
     */
    function initBannerPersonalizado() {
        const $wrapper = $('#banner-personalizado .wrapper');
        
        if ($wrapper.length === 0) return;

        const itemCount = $wrapper.find('.item').length;
        
        // Só inicializa carrossel se tiver mais de 6 itens
        if (itemCount <= 6) return;

        $wrapper.owlCarousel({
            loop: false,
            margin: 10,
            nav: true,
            dots: false,
            navText: HOME.owlDefaults.navText,
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items: 4
                },
                1000: {
                    items: 6
                }
            }
        });
    }

    /**
     * Vitrines de Produtos
     */
    function initVitrines() {
        $('.vitrine_h .owlCarousel').each(function() {
            const $vitrine = $(this);
            const itemCount = $vitrine.find('.prod').length;

            // Não inicializa se tiver poucos produtos
            if (itemCount <= 2) return;

            $vitrine.owlCarousel({
                loop: false,
                margin: 10,
                nav: true,
                dots: true,
                navText: HOME.owlDefaults.navText,
                responsive: {
                    0: {
                        items: 2,
                        dots: false
                    },
                    600: {
                        items: 3
                    },
                    1000: {
                        items: 4
                    }
                }
            });
        });
    }

    /**
     * Widget de Avaliações
     */
    function initWidgetAvaliacoes() {
        const $wrapper = $('#widget_avaliacoes .itens');
        
        if ($wrapper.length === 0) return;

        const itemCount = $wrapper.find('.item').length;
        
        // Não inicializa se tiver poucos itens
        if (itemCount <= 1) return;

        $wrapper.owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            dots: false,
            navText: HOME.owlDefaults.navText,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }

    /**
     * Widget de Marcas
     */
    function initWidgetMarcas() {
        const $wrapper = $('#marcas .itens');
        
        if ($wrapper.length === 0) return;

        const itemCount = $wrapper.find('.item').length;
        
        // Não inicializa se tiver poucos itens
        if (itemCount <= 4) return;

        $wrapper.owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            navText: HOME.owlDefaults.navText,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }

    /**
     * Widget de Blog
     */
    function initWidgetBlog() {
        const $wrapper = $('.blog-posts .wrapper');
        
        if ($wrapper.length === 0) return;

        const itemCount = $wrapper.find('.item').length;
        
        // Não inicializa se tiver poucos itens
        if (itemCount <= 1) return;

        $wrapper.owlCarousel({
            loop: false,
            margin: 15,
            nav: true,
            dots: false,
            navText: HOME.owlDefaults.navText,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 3
                },
                1000: {
                    items: 4
                }
            }
        });
    }

    /**
     * Widget Instagram
     */
    function initWidgetInstagram() {
        // Verifica se Instafeed está disponível
        if (typeof Instafeed === 'undefined') return;

        const token = $('#wid_instagram').data('token');
        const limit = $('#wid_instagram').data('limit') || 6;

        if (!token) return;

        try {
            const userFeed = new Instafeed({
                accessToken: token,
                limit: parseInt(limit),
                template: `
                    <div class="ig_wrapper">
                        <a href="{{link}}" rel="noreferrer" target="_blank">
                            <img src="{{image}}" alt="Instagram" loading="lazy" />
                            <div class="ig_caption">{{caption}}</div>
                        </a>
                    </div>
                `,
                error: function(error) {
                    console.warn('Instagram feed error:', error);
                    $('#wid_instagram').remove();
                }
            });

            userFeed.run();
        } catch (error) {
            console.warn('Instafeed init error:', error);
        }
    }

    /**
     * SmartHint Integration
     */
    function initSmartHint() {
        if (typeof SmartHint === 'undefined') return;
        
        try {
            SmartHint.Call('setPage', {
                type: 'home',
                data: {}
            });
        } catch (error) {
            console.warn('SmartHint error:', error);
        }
    }

    /**
     * Lazy Loading de Imagens
     */
    function initLazyLoading() {
        // Se tiver lazysizes carregado, não faz nada
        if (typeof lazySizes !== 'undefined') return;

        // Implementação simples de lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src || image.src;
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(function(image) {
                imageObserver.observe(image);
            });
        } else {
            // Fallback para navegadores sem suporte
            lazyImages.forEach(function(image) {
                image.src = image.dataset.src || image.src;
            });
        }
    }

    /**
     * Animações no Scroll
     */
    function initScrollAnimations() {
        // Adiciona animação suave aos elementos ao entrarem na viewport
        const animatedElements = document.querySelectorAll('.vitrine_h, #widget_avaliacoes, #marcas, .blog-posts');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(function(element) {
                animationObserver.observe(element);
            });
        }
    }

    /**
     * Utilitários
     */
    const Utils = {
        /**
         * Debounce para otimizar eventos
         */
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        /**
         * Detecta se está em mobile
         */
        isMobile: function() {
            return window.innerWidth <= 800;
        },

        /**
         * Smooth scroll para âncoras
         */
        smoothScroll: function(target, duration = 800) {
            const targetElement = document.querySelector(target);
            if (!targetElement) return;

            const targetPosition = targetElement.offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    };

    /**
     * Performance Monitoring
     */
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                
                console.log(`%c? Home Page loaded in ${pageLoadTime}ms`, 
                    'color: #4CAF50; font-weight: bold;');
            }, 0);
        });
    }

    /**
     * Expõe utilitários globalmente se necessário
     */
    window.HOME_UTILS = Utils;

})(jQuery);
