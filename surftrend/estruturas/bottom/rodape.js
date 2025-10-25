{# ================================================
   FOOTER / RODAPÉ - VANCOUVER TEMPLATE
   ================================================
   Estrutura completa do rodapé da loja
#}

{% set footerText = store.footerText() %}
{% set widgetNews = store.widgetNews() %}
{% set socialIcons = store.socialIcons() %}
{% set pagamentosBrands = store.paymentBrand() %}
{% set selosSeguranca = store.securitySeal() %}
{% set paginasDinamicas = store.getDynamicPages({menu:'1', local:'1'}) %}
{% set paginasAjuda = store.getDynamicPages({menu:'1', local:'2'}) %}
{% set paginasInfo = store.getInfoPages() %}
{% set dadosLoja = store.getStoreData() %}

<footer id="footer">
    <!-- Newsletter -->
    <section id="newsletter" class="newsletter">
        <div class="central">
            <div class="wrapper">
                <div class="text">
                    <h3 class="title">{{ widgetNews.title ?: 'CADASTRE-SE E RECEBA NOVIDADES' }}</h3>
                    <p class="subtitle">
                        {{ widgetNews.subtitle1 ?: 'Fique por dentro das novidades' }}
                        {% if widgetNews.subtitle2 %}
                        <br>{{ widgetNews.subtitle2 }}
                        {% endif %}
                    </p>
                </div>

                <form id="frmNews" action="news_func.php" method="post" class="form post">
                    <div class="input-group">
                        <input 
                            type="email" 
                            name="email" 
                            class="form-control" 
                            placeholder="Digite seu e-mail" 
                            aria-label="Digite seu e-mail"
                            required
                        />
                        <button type="submit" class="btn-submit">
                            <i class="ri-send-plane-fill"></i>
                            <span>INSCREVER</span>
                        </button>
                    </div>
                    
                    <div class="response"></div>
                </form>
            </div>
        </div>
    </section>

    <!-- Links e Informações -->
    <section id="footer-main" class="footer-main">
        <div class="central">
            <div class="grid">
                <!-- Logo e Descrição -->
                <div class="col col-about">
                    {% set logo = store.getLogo() %}
                    {% if logo %}
                    <div class="logo">
                        <a href="{{ base }}/" aria-label="Página inicial">
                            <img src="{{ logo }}" alt="{{ dadosLoja.loja }}" />
                        </a>
                    </div>
                    {% endif %}

                    {% if footerText.rodape %}
                    <div class="description">
                        {{ footerText.rodape|raw }}
                    </div>
                    {% endif %}

                    <!-- Redes Sociais -->
                    {% if socialIcons.items|length > 0 %}
                    <div class="social-icons">
                        <p class="label">Siga-nos</p>
                        <div class="icons">
                            {% for social in socialIcons.items %}
                            <a 
                                href="{{ social.url }}" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="{{ social.titulo }}"
                                {% if social.cor_fundo %}style="background-color: {{ social.cor_fundo }};"{% endif %}
                            >
                                {% if social.tipo == '1' %}
                                <i class="{{ social.icone }}" 
                                   {% if social.cor_icone %}style="color: {{ social.cor_icone }};"{% endif %}
                                ></i>
                                {% else %}
                                <img src="{{ social.icone }}" alt="{{ social.titulo }}" />
                                {% endif %}
                            </a>
                            {% endfor %}
                        </div>
                    </div>
                    {% endif %}
                </div>

                <!-- Institucional -->
                {% if paginasDinamicas|length > 0 %}
                <div class="col col-links">
                    <h4 class="title">Institucional</h4>
                    <ul class="links">
                        {% for pagina in paginasDinamicas %}
                        <li>{{ pagina|raw }}</li>
                        {% endfor %}
                    </ul>
                </div>
                {% endif %}

                <!-- Ajuda -->
                <div class="col col-links">
                    <h4 class="title">Ajuda</h4>
                    <ul class="links">
                        {% if paginasAjuda|length > 0 %}
                            {% for pagina in paginasAjuda %}
                            <li>{{ pagina|raw }}</li>
                            {% endfor %}
                        {% endif %}
                        
                        <!-- Links fixos de ajuda -->
                        <li><a href="central/">Minha Conta</a></li>
                        <li><a href="central/pedidos/">Meus Pedidos</a></li>
                        <li><a href="rastreio/">Rastrear Pedido</a></li>
                        <li><a href="fale-conosco/">Fale Conosco</a></li>
                    </ul>
                </div>

                <!-- Informações -->
                <div class="col col-links">
                    <h4 class="title">Informações</h4>
                    <ul class="links">
                        {% if paginasInfo|length > 0 %}
                            {% for pagina in paginasInfo %}
                            <li>{{ pagina|raw }}</li>
                            {% endfor %}
                        {% endif %}

                        <!-- Avaliações -->
                        <li><a href="avaliacoes/">Avaliações</a></li>
                    </ul>
                </div>

                <!-- Contato -->
                <div class="col col-contact">
                    <h4 class="title">Contato</h4>
                    
                    {% if dadosLoja.telefone or dadosLoja.celular %}
                    <div class="contact-item">
                        <i class="ri-phone-line"></i>
                        <div class="info">
                            {% if dadosLoja.telefone %}
                            <a href="tel:{{ dadosLoja.telefone|replace({' ': '', '-': '', '(': '', ')': ''}) }}">
                                {{ dadosLoja.telefone }}
                            </a>
                            {% endif %}
                            {% if dadosLoja.celular %}
                            <a href="tel:{{ dadosLoja.celular|replace({' ': '', '-': '', '(': '', ')': ''}) }}">
                                {{ dadosLoja.celular }}
                            </a>
                            {% endif %}
                        </div>
                    </div>
                    {% endif %}

                    {% if dadosLoja.endereco %}
                    <div class="contact-item">
                        <i class="ri-map-pin-line"></i>
                        <div class="info">
                            <p>
                                {{ dadosLoja.endereco }}{% if dadosLoja.endnum %}, {{ dadosLoja.endnum }}{% endif %}
                                {% if dadosLoja.complemento %}<br>{{ dadosLoja.complemento }}{% endif %}
                                {% if dadosLoja.bairro %}<br>{{ dadosLoja.bairro }}{% endif %}
                                {% if dadosLoja.cidade and dadosLoja.uf %}
                                <br>{{ dadosLoja.cidade }} - {{ dadosLoja.uf }}
                                {% endif %}
                                {% if dadosLoja.cep %}<br>CEP: {{ dadosLoja.cep }}{% endif %}
                            </p>
                        </div>
                    </div>
                    {% endif %}

                    <div class="contact-item">
                        <i class="ri-time-line"></i>
                        <div class="info">
                            <p>{{ global.textos_painel.rodape_horario ?: 'Seg - Sex: 9h às 18h' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Formas de Pagamento e Selos -->
    <section id="footer-payment" class="footer-payment">
        <div class="central">
            <div class="wrapper">
                <!-- Formas de Pagamento -->
                {% if pagamentosBrands.brand|length > 0 %}
                <div class="payment-brands">
                    <p class="label">Formas de Pagamento</p>
                    <div class="brands">
                        {% for brand in pagamentosBrands.brand %}
                        <span class="brand" title="{{ brand.nome }}">
                            <img src="{{ brand.icone }}" alt="{{ brand.nome }}" />
                        </span>
                        {% endfor %}
                    </div>
                </div>
                {% endif %}

                <!-- Selos de Segurança -->
                {% if selosSeguranca|length > 0 %}
                <div class="security-seals">
                    <p class="label">Segurança</p>
                    <div class="seals">
                        {% for selo in selosSeguranca %}
                        {{ selo|raw }}
                        {% endfor %}
                    </div>
                </div>
                {% endif %}
            </div>
        </div>
    </section>

    <!-- Copyright e Info Legal -->
    <section id="footer-bottom" class="footer-bottom">
        <div class="central">
            <div class="wrapper">
                <div class="copyright">
                    <p>
                        © {{ 'now'|date('Y') }} {{ dadosLoja.razao ?: dadosLoja.loja }}
                        {% if dadosLoja.doc1 %}
                        - CNPJ: {{ dadosLoja.doc1 }}
                        {% endif %}
                    </p>
                    <p class="rights">Todos os direitos reservados.</p>
                </div>

                <div class="powered">
                    <a href="https://www.wbuy.com.br" target="_blank" rel="noopener noreferrer">
                        <span>Plataforma</span>
                        <img src="{{ base_system }}/img/logo-wbuy-white.svg" alt="wBuy E-commerce" />
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Botão Voltar ao Topo -->
    <button id="back-to-top" class="back-to-top" aria-label="Voltar ao topo">
        <i class="ri-arrow-up-line"></i>
    </button>

    <!-- Texto Base (SEO) -->
    {% if footerText.base %}
    <div class="footer-seo">
        <div class="central">
            {{ footerText.base|raw }}
        </div>
    </div>
    {% endif %}
</footer>
