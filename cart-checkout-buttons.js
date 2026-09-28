(function () {
  'use strict';

  // Cores usam var(--token, fallback): usa a variável do tema quando existir.
  var CONFIG = {
    footerBackground: 'var(--main-background, #ffffff)',
    footerShadow: '0 -6px 16px rgba(0,0,0,0.15)',
    footerPaddingY: '12px',
    footerZIndex: 2147483000,
    buttonsGap: '10px',
    buttonPaddingY: '16px',
    walletButtonHeight: '54px',
    totalColor: 'var(--main-foreground, #000000)',
    totalFontSize: '26px',
    sideInset: '5%',
    breakdownArrowColor: 'var(--main-foreground, #000000)'
  };

  var STYLE_ID = 'ec-cart-custom-style';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    var css = [
      '#modal-cart .js-ajax-cart-panel {',
      '  display: flex;',
      '  flex-direction: column;',
      '  height: 100%;',
      '}',
      '#modal-cart .modal-header {',
      '  flex: 0 0 auto;',
      '}',
      // Rolagem isolada em .ec-cart-scroll; footer sempre fixo no fim (sticky sozinho não gruda com pouco conteúdo).
      '#modal-cart .modal-body {',
      '  display: flex;',
      '  flex-direction: column;',
      '  flex: 1 1 auto;',
      '  min-height: 0;',
      '  overflow: hidden;',
      '}',
      '#modal-cart .ec-cart-scroll {',
      '  flex: 1 1 auto;',
      '  min-height: 0;',
      '  overflow-y: auto;',
      '  overflow-x: hidden;',
      '}',
      // overflow-x evita rolagem lateral; sem max-width, que quebra a sangria de margem negativa.
      '#modal-cart .ec-cart-footer {',
      '  flex: 0 0 auto;',
      '  overflow-x: hidden;',
      '  box-sizing: border-box;',
      '  background: ' + CONFIG.footerBackground + ';',
      '  box-shadow: ' + CONFIG.footerShadow + ';',
      '  padding-top: ' + CONFIG.footerPaddingY + ';',
      '  padding-bottom: ' + CONFIG.footerPaddingY + ';',
      '  z-index: ' + CONFIG.footerZIndex + ';',
      '}',
      '#modal-cart .ec-cart-footer .cart-total {',
      '  margin-left: 0 !important;',
      '  margin-right: 0 !important;',
      '}',
      '#modal-cart .ec-cart-footer .cart-total > * {',
      '  padding-left: 0 !important;',
      '  padding-right: 0 !important;',
      '}',
      // Mesmo inset em total e resumo, pra ficarem alinhados entre si e com os botões.
      '#modal-cart .ec-cart-footer .js-cart-total-container,',
      '#modal-cart .ec-cart-footer .ec-breakdown {',
      '  padding-left: 0 !important;',
      '  padding-right: 32px !important;',
      '  margin-left: ' + CONFIG.sideInset + ';',
      '}',
      '#modal-cart .ec-cart-footer .js-cart-total-container {',
      '  position: relative;',
      '  margin-bottom: 14px;',
      '}',
      '#modal-cart .cart-total-label {',
      '  display: none !important;',
      '}',
      '#modal-cart .cart-total {',
      '  display: flex;',
      '  align-items: baseline;',
      '  flex-wrap: wrap;',
      '  gap: 8px;',
      '}',
      '#modal-cart .js-cart-total.cart-total-price {',
      '  color: ' + CONFIG.totalColor + ';',
      '  font-size: ' + CONFIG.totalFontSize + ';',
      '  font-weight: 800;',
      '  text-align: left !important;',
      '}',
      '#modal-cart .cart-secondary-total-container {',
      '  margin: 0 !important;',
      '}',
      '#modal-cart .js-installments-cart-total {',
      '  margin: 0 !important;',
      '  text-align: left !important;',
      '}',
      // Input não tem padding inline conflitante; altura do botão Nuvem Pay é ajustada via JS (vem com height inline).
      '#modal-cart #ajax-cart-submit-div input[name="go_to_checkout"] {',
      '  padding-top: ' + CONFIG.buttonPaddingY + ' !important;',
      '  padding-bottom: ' + CONFIG.buttonPaddingY + ' !important;',
      '}',
      '#modal-cart .ec-breakdown {',
      '  display: none;',
      '}',
      '#modal-cart .ec-breakdown.ec-breakdown-open {',
      '  display: block;',
      '  margin: 8px 0;',
      '  border-bottom: 1px solid rgba(0,0,0,0.08);',
      '}',
      // Linhas do resumo são só texto espelhado (não os nós nativos) — layout livre, sem herdar nada do tema.
      '#modal-cart .ec-breakdown-row {',
      '  display: flex;',
      '  justify-content: space-between;',
      '  align-items: baseline;',
      '  gap: 8px;',
      '  font-size: 13px;',
      '  padding: 4px 0;',
      '}',
      '#modal-cart .ec-breakdown-label {',
      '  opacity: 0.7;',
      '}',
      '#modal-cart .ec-breakdown-shipping-row[data-ec-linked="true"] .ec-breakdown-value {',
      '  cursor: pointer;',
      '  text-decoration: underline;',
      '}',
      '#modal-cart .ec-breakdown-toggle {',
      '  position: absolute;',
      '  top: 4px;',
      '  right: 0;',
      '  background: transparent;',
      '  border: none;',
      '  padding: 6px;',
      '  margin: 0% 5% 0% 0%;',
      '  line-height: 0;',
      '  cursor: pointer;',
      '  color: ' + CONFIG.breakdownArrowColor + ';',
      '}',
      '#modal-cart .ec-breakdown-toggle svg {',
      '  display: block;',
      '  transition: transform 0.2s ease;',
      '}',
      '#modal-cart .ec-breakdown-toggle.ec-breakdown-toggle-open svg {',
      '  transform: rotate(180deg);',
      '}',
      // "Ver mais produtos" vira link discreto no fim do footer.
      '#modal-cart .ec-cart-footer .ec-more-link {',
      '  display: block !important;',
      '  width: auto !important;',
      '  margin: 10px auto 0 !important;',
      '  padding: 4px !important;',
      '  background: transparent !important;',
      '  border: none !important;',
      '  box-shadow: none !important;',
      '  font-size: 12px !important;',
      '  font-weight: 600 !important;',
      '  text-align: center !important;',
      '  text-decoration: underline;',
      '  opacity: 0.7;',
      '}'
    ].join('\n');

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = css;
    document.head.appendChild(style);
  }

  // Checkout já vem com margin 0 inline; altura do botão Nuvem Pay só ajusta via JS (também inline).
  function enhanceButtonSpacing(buttonsContainer) {
    var walletBtn = buttonsContainer.querySelector('[data-testid="express-checkout-panel-button"]');
    if (walletBtn) {
      walletBtn.style.setProperty('height', CONFIG.walletButtonHeight, 'important');
    }
  }

  // Esconde o painel quando o widget não renderiza nenhum botão (evita espaço em branco).
  function enhanceWalletPanel(buttonsContainer) {
    var walletPanel = buttonsContainer.querySelector('[id^="wallet-express-checkout-panel"]');
    if (!walletPanel) return;

    var hasButton = !!walletPanel.querySelector(
      '[data-testid="express-checkout-panel-button"], button, [role="button"]'
    );
    walletPanel.style.display = hasButton ? '' : 'none';

    styleWalletDivider(walletPanel);
  }

  // Divisor "OU" é recriado pelo widget a cada evento do carrinho — sempre reestilizado, sem flag de estado.
  function styleWalletDivider(walletPanel) {
    var candidates = walletPanel.querySelectorAll('span, div');
    var ouNode = null;
    for (var i = 0; i < candidates.length; i++) {
      var el = candidates[i];
      if (el.children.length === 0 && (el.textContent || '').trim().toUpperCase() === 'OU') {
        ouNode = el;
        break;
      }
    }
    if (!ouNode) return;

    // Sobe até o ancestral com mais de um filho (a linha completa do divisor).
    var node = ouNode;
    while (node.parentElement && node.parentElement.children.length === 1) {
      node = node.parentElement;
    }
    var row = node.parentElement || node;

    row.style.setProperty('margin', '0', 'important');
    row.style.setProperty('opacity', '0.55', 'important');
    ouNode.style.setProperty('font-size', '11px', 'important');
    ouNode.style.setProperty('letter-spacing', '0.5px', 'important');
    ouNode.style.setProperty('text-transform', 'uppercase', 'important');
    ouNode.style.setProperty('margin', '30% 0% 30% 0%', 'important');

    // Zera os respiros vazios ao redor do divisor e depois do botão, pra ficar mais justo.
    var prev = row.previousElementSibling;
    if (prev && !prev.textContent.trim()) {
      prev.style.setProperty('margin', '0', 'important');
    }
    var next = row.nextElementSibling;
    if (next && !next.textContent.trim()) {
      next.style.setProperty('margin', '0', 'important');
    }

    var buttonEl = walletPanel.querySelector('[data-testid="express-checkout-panel-button"]');
    var afterBtn = buttonEl && buttonEl.nextElementSibling;
    if (afterBtn && afterBtn.children.length === 0 && !afterBtn.textContent.trim()) {
      afterBtn.style.setProperty('margin', '0', 'important');
    }
  }

  var TOGGLE_ICON =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<polyline points="6 9 12 15 18 9"></polyline></svg>';

  // Só lê (nunca move) Subtotal/Frete nativos: mover esses nós é o que quebrava a atualização do frete.
  function buildBreakdownRows(modal) {
    var subtotalValueEl = modal.querySelector('.js-cart-subtotal');
    if (!subtotalValueEl) return null;

    var breakdown = modal.querySelector('.ec-breakdown');
    if (!breakdown) {
      breakdown = document.createElement('div');
      breakdown.className = 'ec-breakdown';
      breakdown.innerHTML =
        '<div class="ec-breakdown-row">' +
          '<span class="ec-breakdown-label">Subtotal</span>' +
          '<span class="ec-breakdown-value" data-ec-mirror="subtotal"></span>' +
        '</div>' +
        '<div class="ec-breakdown-row ec-breakdown-shipping-row">' +
          '<span class="ec-breakdown-label">Frete</span>' +
          '<span class="ec-breakdown-value" data-ec-mirror="shipping"></span>' +
        '</div>';
    }

    // Só escreve se mudou: setar sempre dispara o observer e trava a aba em loop.
    setMirrorText(breakdown.querySelector('[data-ec-mirror="subtotal"]'), subtotalValueEl.textContent.trim());

    var shippingRow = breakdown.querySelector('.ec-breakdown-shipping-row');
    var shippingValueEl = modal.querySelector('#shipping-cost');
    if (shippingValueEl && shippingValueEl.textContent.trim()) {
      shippingRow.style.display = '';
      setMirrorText(shippingRow.querySelector('[data-ec-mirror="shipping"]'), shippingValueEl.textContent.trim());
      enhanceShippingLink(shippingRow, modal);
    } else {
      shippingRow.style.display = 'none';
    }

    return breakdown;
  }

  function setMirrorText(el, text) {
    if (el.textContent !== text) el.textContent = text;
  }

  // Clique no valor espelhado abre o accordion nativo de frete e foca o CEP — só o link é nosso, o cálculo é 100% nativo.
  function enhanceShippingLink(shippingRow, modal) {
    if (shippingRow.getAttribute('data-ec-linked') === 'true') return;
    shippingRow.setAttribute('data-ec-linked', 'true');

    shippingRow.addEventListener('click', function () {
      var cepInput = modal.querySelector('.js-shipping-input');
      var toggle = modal.querySelector('.js-accordion-private-toggle');
      if (toggle && cepInput && cepInput.offsetParent === null) {
        toggle.click();
      }
      setTimeout(function () {
        if (cepInput) {
          cepInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cepInput.focus();
        }
      }, 200);
    });
  }

  // Seta abre/fecha o resumo já montado, sem duplicar ou recalcular valores.
  function enhanceBreakdownToggle(breakdown, totalContainer) {
    var toggleBtn = totalContainer.querySelector('.ec-breakdown-toggle');
    if (toggleBtn) return;

    toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'ec-breakdown-toggle';
    toggleBtn.setAttribute('aria-label', 'Ver detalhes do valor total');
    toggleBtn.innerHTML = TOGGLE_ICON;
    totalContainer.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = breakdown.classList.toggle('ec-breakdown-open');
      toggleBtn.classList.toggle('ec-breakdown-toggle-open', isOpen);
    });
  }

  // Esconde o rótulo "Total:" e junta o parcelamento na mesma linha do preço.
  function enhanceTotalRow(totalContainer) {
    var label = totalContainer.querySelector('.cart-total-label');
    if (label) label.style.display = 'none';

    var totalRow = totalContainer.querySelector('.cart-total');
    var installments = totalContainer.querySelector('.js-installments-cart-total');
    if (totalRow && installments && installments.parentNode !== totalRow) {
      totalRow.appendChild(installments);
    }
  }

  // Espelha o padding real do modal-body no footer, pra ele sangrar até a borda certa.
  function syncFooterBleed(modalBody, footer) {
    var cs = getComputedStyle(modalBody);
    footer.style.marginLeft = '-' + cs.paddingLeft;
    footer.style.marginRight = '-' + cs.paddingRight;
    footer.style.paddingLeft = cs.paddingLeft;
    footer.style.paddingRight = cs.paddingRight;
  }

  // Move total, resumo, botões e "ver mais" pro footer fixo; cupom/frete grátis ficam no lugar de sempre.
  function buildFooter(modal) {
    var modalBody = modal.querySelector('.modal-body');
    var totalContainer = modal.querySelector('.js-cart-total-container');
    var buttonsContainer = document.getElementById('ajax-cart-submit-div');
    if (!modalBody || !totalContainer || !buttonsContainer) return null;

    // href*="/produtos" bateria também no link de cada item; só a classe é específica o bastante.
    var moreLink = modal.querySelector('a.btn-opacity-05');
    if (moreLink) moreLink.classList.add('ec-more-link');

    var scrollArea = modalBody.querySelector('.ec-cart-scroll');
    if (!scrollArea) {
      scrollArea = document.createElement('div');
      scrollArea.className = 'ec-cart-scroll';
      while (modalBody.firstChild) {
        scrollArea.appendChild(modalBody.firstChild);
      }
      modalBody.appendChild(scrollArea);
    }

    // CA_gift_cart vive dentro de #ajax-cart-submit-div; busca no modal todo pra achar mesmo após já ter movido.
    var giftBanner = modal.querySelector('#CA_gift_cart');
    if (giftBanner && giftBanner.parentElement !== scrollArea) {
      scrollArea.appendChild(giftBanner);
    }

    var breakdown = buildBreakdownRows(modal);

    var footer = modalBody.querySelector('.ec-cart-footer');
    var isComplete =
      footer &&
      footer === modalBody.lastElementChild &&
      footer.contains(totalContainer) &&
      (!breakdown || footer.contains(breakdown)) &&
      footer.contains(buttonsContainer) &&
      (!moreLink || footer.contains(moreLink));

    if (!isComplete) {
      if (!footer) {
        footer = document.createElement('div');
        footer.className = 'ec-cart-footer';
      }

      if (breakdown) footer.appendChild(breakdown);
      footer.appendChild(totalContainer);
      footer.appendChild(buttonsContainer);
      if (moreLink) footer.appendChild(moreLink);
      modalBody.appendChild(footer);
    }

    syncFooterBleed(modalBody, footer);

    return {
      footer: footer,
      breakdown: breakdown,
      totalContainer: totalContainer,
      buttonsContainer: buttonsContainer,
      giftBanner: giftBanner
    };
  }

  function processCart(modal) {
    var parts = buildFooter(modal);
    if (!parts) return;

    enhanceTotalRow(parts.totalContainer);
    if (parts.breakdown) enhanceBreakdownToggle(parts.breakdown, parts.totalContainer);
    enhanceButtonSpacing(parts.buttonsContainer);
    enhanceWalletPanel(parts.buttonsContainer);
  }

  function watchModal(modal) {
    processCart(modal);
    var innerObserver = new MutationObserver(function () {
      processCart(modal);
    });
    // characterData pega a mutação direta do texto do frete, que childList sozinho não cobre.
    innerObserver.observe(modal, { childList: true, subtree: true, characterData: true });
  }

  function init() {
    injectStyle();

    var modal = document.getElementById('modal-cart');
    if (modal) {
      watchModal(modal);
      return;
    }

    // Modal ainda não existe no DOM — espera aparecer.
    var bootstrapObserver = new MutationObserver(function () {
      var modalNode = document.getElementById('modal-cart');
      if (modalNode) {
        bootstrapObserver.disconnect();
        watchModal(modalNode);
      }
    });
    bootstrapObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
