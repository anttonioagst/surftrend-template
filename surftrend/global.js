/**
 * ================================================
 * GLOBAL JAVASCRIPT - VANCOUVER TEMPLATE
 * ================================================
 * Scripts globais do tema
 * Inclui inicializações, utilidades e integrações
 */

(function($) {
    'use strict';

    /**
     * Configurações Globais
     */
    const THEME = {
        version: '1.0.0',
        name: 'Vancouver',
        breakpoint: 800,
        debug: false
    };

    /**
     * Inicialização quando o DOM estiver pronto
     */
    $(function() {
        initMasks();
        initValidation();
        initModals();
        initTooltips();
        initLazyLoad();
        initSmoothScroll();
        initForms();
        initAlerts();
        initLoadingStates();
        initAnalytics();
        
        // Log de inicialização
        if (THEME.debug) {
            console.log(`%c? ${THEME.name} Theme v${THEME.version} loaded`, 
                'color: #4CAF50; font-weight: bold; font-size: 14px;');
        }
    });

    /**
     * ===== MÁSCARAS DE INPUT =====
     */
    function initMasks() {
        // Verifica se jQuery Mask está disponível
        if (typeof $.fn.mask === 'undefined') return;

        // CEP
        $('input[name*="cep"], input[data-mask="cep"]').mask('00000-000');

        // Telefone
        $('input[name*="telefone"], input[name*="phone"], input[data-mask="phone"]').mask('(00) 0000-00009')
            .on('blur', function() {
                const val = $(this).val().replace(/\D/g, '');
                if (val.length === 11) {
                    $(this).mask('(00) 00000-0000');
                } else {
                    $(this).mask('(00) 0000-00009');
                }
            });

        // CPF
        $('input[name*="cpf"], input[data-mask="cpf"]').mask('000.000.000-00', {
            reverse: true
        });

        // CNPJ
        $('input[name*="cnpj"], input[data-mask="cnpj"]').mask('00.000.000/0000-00', {
            reverse: true
        });

        // Data
        $('input[type="date"], input[data-mask="date"]').mask('00/00/0000');

        // Dinheiro
        $('input[data-mask="money"]').mask('000.000.000.000.000,00', {
            reverse: true
        });

        // Cartão de crédito
        $('input[data-mask="creditcard"]').mask('0000 0000 0000 0000');

        // CVV
        $('input[data-mask="cvv"]').mask('0000');
    }

    /**
     * ===== VALIDAÇÃO DE FORMULÁRIOS =====
     */
    function initValidation() {
        // Verifica se jQuery Validate está disponível
        if (typeof $.fn.validate === 'undefined') return;

        // Configurações padrão
        $.validator.setDefaults({
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function(error, element) {
                error.addClass('invalid-feedback');
                if (element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function(element) {
                $(element).addClass('is-invalid').removeClass('is-valid');
            },
            unhighlight: function(element) {
                $(element).removeClass('is-invalid').addClass('is-valid');
            }
        });

        // Métodos customizados
        $.validator.addMethod('cpf', function(value, element) {
            value = value.replace(/[^\d]+/g, '');
            if (value.length !== 11 || /^(\d)\1+$/.test(value)) return false;
            
            let sum = 0;
            let remainder;
            
            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(value.substring(i - 1, i)) * (11 - i);
            }
            
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(value.substring(9, 10))) return false;
            
            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(value.substring(i - 1, i)) * (12 - i);
            }
            
            remainder = (sum * 10) % 11;
            if (remainder === 10 || remainder === 11) remainder = 0;
            if (remainder !== parseInt(value.substring(10, 11))) return false;
            
            return true;
        }, 'CPF inválido');

        $.validator.addMethod('cnpj', function(value, element) {
            value = value.replace(/[^\d]+/g, '');
            if (value.length !== 14) return false;
            
            // Validação simplificada de CNPJ
            return true; // Implementar validação completa se necessário
        }, 'CNPJ inválido');

        // Valida formulários com classe .needs-validation
        $('.needs-validation').each(function() {
            $(this).validate();
        });
    }

    /**
     * ===== MODAIS =====
     */
    function initModals() {
        // Verifica se MyModal está disponível
        if (typeof $.fn.mymodal === 'undefined') return;

        // Inicializa links com classe .mymodal
        $('.mymodal').mymodal({
            width: function() {
                return $(this).data('width') || 600;
            },
            title: function() {
                return $(this).data('title') || '';
            }
        });

        // Fecha modal com ESC
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' || e.keyCode === 27) {
                $('.mymodal-close').trigger('click');
            }
        });
    }

    /**
     * ===== TOOLTIPS =====
     */
    function initTooltips() {
        // Inicializa tooltips simples
        $('[data-tooltip]').each(function() {
            const $el = $(this);
            const text = $el.data('tooltip');
            
            $el.on('mouseenter', function() {
                const $tooltip = $('<div class="tooltip-custom"></div>').text(text);
                $('body').append($tooltip);
                
                const pos = $el.offset();
                $tooltip.css({
                    top: pos.top - $tooltip.outerHeight() - 10,
                    left: pos.left + ($el.outerWidth() / 2) - ($tooltip.outerWidth() / 2)
                }).fadeIn(200);
            });
            
            $el.on('mouseleave', function() {
                $('.tooltip-custom').fadeOut(200, function() {
                    $(this).remove();
                });
            });
        });
    }

    /**
     * ===== LAZY LOADING =====
     */
    function initLazyLoad() {
        // Usa lazysizes se disponível
        if (typeof lazySizes !== 'undefined') {
            return;
        }

        // Implementação simples com IntersectionObserver
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
            
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.dataset.src || img.getAttribute('data-src');
                        
                        if (src) {
                            img.src = src;
                            img.classList.remove('lazy');
                            img.removeAttribute('data-src');
                        }
                        
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * ===== SMOOTH SCROLL =====
     */
    function initSmoothScroll() {
        // Scroll suave para âncoras
        $('a[href*="#"]:not([href="#"]):not([href="#!"])').on('click', function(e) {
            const target = $(this.hash);
            
            if (target.length === 0) return;
            
            e.preventDefault();
            
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 600, 'swing');
        });
    }

    /**
     * ===== FORMULÁRIOS =====
     */
    function initForms() {
        // Form submission com loading
        $('form.post').on('submit', function() {
            const $form = $(this);
            const $btn = $form.find('button[type="submit"]');
            
            if ($btn.length > 0) {
                $btn.prop('disabled', true);
                $btn.data('original-text', $btn.html());
                $btn.html('<i class="ri-loader-4-line ri-spin"></i> Enviando...');
            }
        });

        // Auto-resize de textarea
        $('textarea.auto-resize').on('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });

        // Contador de caracteres
        $('[data-maxlength]').each(function() {
            const $input = $(this);
            const max = parseInt($input.data('maxlength'));
            const $counter = $('<small class="char-counter"></small>');
            
            $input.after($counter);
            
            $input.on('input', function() {
                const current = $input.val().length;
                $counter.text(`${current}/${max}`);
                
                if (current >= max) {
                    $counter.addClass('text-danger');
                } else {
                    $counter.removeClass('text-danger');
                }
            }).trigger('input');
        });
    }

    /**
     * ===== ALERTAS =====
     */
    function initAlerts() {
        // Fecha alertas com botão
        $(document).on('click', '.alert .close', function() {
            $(this).closest('.alert').fadeOut(300, function() {
                $(this).remove();
            });
        });

        // Auto-close de alertas
        $('.alert[data-auto-close]').each(function() {
            const $alert = $(this);
            const timeout = parseInt($alert.data('auto-close')) || 5000;
            
            setTimeout(function() {
                $alert.fadeOut(300, function() {
                    $(this).remove();
                });
            }, timeout);
        });
    }

    /**
     * ===== LOADING STATES =====
     */
    function initLoadingStates() {
        // Adiciona classe loading ao body durante AJAX
        $(document).on('ajaxStart', function() {
            $('body').addClass('loading');
        });
        
        $(document).on('ajaxStop', function() {
            $('body').removeClass('loading');
        });
    }

    /**
     * ===== ANALYTICS =====
     */
    function initAnalytics() {
        // Google Analytics page view
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_path: window.location.pathname
            });
        }

        // Track outbound links
        $('a[href^="http"]').not('[href*="' + window.location.hostname + '"]').on('click', function() {
            const href = $(this).attr('href');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'outbound_click', {
                    'event_category': 'outbound',
                    'event_label': href,
                    'transport_type': 'beacon'
                });
            }
        });
    }

    /**
     * ===== UTILITÁRIOS =====
     */
    const Utils = {
        /**
         * Debounce
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
         * Throttle
         */
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        /**
         * Formata preço
         */
        formatPrice: function(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        },

        /**
         * Formata data
         */
        formatDate: function(date) {
            return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
        },

        /**
         * Valida email
         */
        validateEmail: function(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },

        /**
         * Detecta mobile
         */
        isMobile: function() {
            return window.innerWidth <= THEME.breakpoint;
        },

        /**
         * Detecta iOS
         */
        isIOS: function() {
            return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        },

        /**
         * Detecta Safari
         */
        isSafari: function() {
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        },

        /**
         * Get URL params
         */
        getUrlParams: function() {
            const params = {};
            const queryString = window.location.search.substring(1);
            const pairs = queryString.split('&');
            
            pairs.forEach(function(pair) {
                const [key, value] = pair.split('=');
                if (key) {
                    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
                }
            });
            
            return params;
        },

        /**
         * Scroll to element
         */
        scrollTo: function(target, offset = 100) {
            const $target = $(target);
            if ($target.length === 0) return;
            
            $('html, body').animate({
                scrollTop: $target.offset().top - offset
            }, 600, 'swing');
        },

        /**
         * Show notification
         */
        notify: function(message, type = 'info', duration = 5000) {
            const $notification = $(`
                <div class="notification notification-${type}">
                    <div class="notification-content">
                        <i class="ri-${type === 'success' ? 'check' : 'information'}-line"></i>
                        <span>${message}</span>
                    </div>
                    <button class="notification-close">×</button>
                </div>
            `);
            
            $('body').append($notification);
            
            setTimeout(() => $notification.addClass('show'), 100);
            
            $notification.find('.notification-close').on('click', function() {
                $notification.removeClass('show');
                setTimeout(() => $notification.remove(), 300);
            });
            
            if (duration > 0) {
                setTimeout(() => {
                    $notification.removeClass('show');
                    setTimeout(() => $notification.remove(), 300);
                }, duration);
            }
        },

        /**
         * Copy to clipboard
         */
        copyToClipboard: function(text) {
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    Utils.notify('Copiado para a área de transferência!', 'success');
                });
            } else {
                // Fallback
                const $temp = $('<textarea>');
                $('body').append($temp);
                $temp.val(text).select();
                document.execCommand('copy');
                $temp.remove();
                Utils.notify('Copiado para a área de transferência!', 'success');
            }
        }
    };

    /**
     * ===== PERFORMANCE MONITORING =====
     */
    if (window.performance && THEME.debug) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                
                console.log('%c? Performance Stats', 'color: #2196F3; font-weight: bold;');
                console.log(`Page Load: ${pageLoadTime}ms`);
                console.log(`Connection: ${connectTime}ms`);
            }, 0);
        });
    }

    /**
     * ===== ATALHOS DE TECLADO =====
     */
    $(document).on('keydown', function(e) {
        // Ctrl/Cmd + K abre busca
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            $('input[name="q"], .search-input').first().focus();
        }
    });

    /**
     * ===== EXPÕE GLOBALMENTE =====
     */
    window.THEME = THEME;
    window.UTILS = Utils;

    /**
     * ===== CLASSES AUXILIARES =====
     */
    
    // Loading Overlay
    class LoadingOverlay {
        constructor() {
            this.$overlay = null;
        }
        
        show(message = 'Carregando...') {
            if (this.$overlay) return;
            
            this.$overlay = $(`
                <div class="loading-overlay">
                    <div class="loading-content">
                        <i class="ri-loader-4-line ri-spin"></i>
                        <p>${message}</p>
                    </div>
                </div>
            `);
            
            $('body').append(this.$overlay);
            setTimeout(() => this.$overlay.addClass('show'), 10);
        }
        
        hide() {
            if (!this.$overlay) return;
            
            this.$overlay.removeClass('show');
            setTimeout(() => {
                this.$overlay.remove();
                this.$overlay = null;
            }, 300);
        }
    }
    
    window.LoadingOverlay = new LoadingOverlay();

    // Service Worker (PWA)
    if ('serviceWorker' in navigator && !THEME.debug) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service_worker.js').then(
                function(registration) {
                    console.log('ServiceWorker registered:', registration.scope);
                },
                function(error) {
                    console.log('ServiceWorker registration failed:', error);
                }
            );
        });
    }

})(jQuery);
