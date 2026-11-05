import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Send, 
  Copy, 
  Check, 
  Bike, 
  Store, 
  CreditCard, 
  QrCode, 
  Banknote,
  AlertCircle
} from 'lucide-react';
import { CartItem, OrderForm, StoreConfig } from '../types';
import { formatMoney } from '../data/menu';

interface CartSectionProps {
  cart: CartItem[];
  storeConfig: StoreConfig;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartSection: React.FC<CartSectionProps> = ({
  cart,
  storeConfig,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [form, setForm] = useState<OrderForm>({
    name: '',
    phone: '',
    deliveryType: 'delivery',
    address: '',
    neighborhood: '',
    paymentMethod: 'pix',
    changeFor: '',
    notes: '',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCost = form.deliveryType === 'delivery' ? storeConfig.deliveryFee : 0;
  const grandTotal = subtotal + deliveryCost;

  const buildWhatsAppMessage = () => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    // Formatação detalhada de cada produto com quantidade, preço unitário e subtotal
    const itemsText = cart.map((item, index) => {
      const unitPrice = formatMoney(item.product.price);
      const itemSubtotal = formatMoney(item.product.price * item.quantity);
      let line = `${index + 1}. *${item.product.name}*\n` +
                 `   • Quantidade: ${item.quantity}\n` +
                 `   • Preço unitário: ${unitPrice}\n` +
                 `   • Subtotal: ${itemSubtotal}`;
      if (item.notes && item.notes.trim()) {
        line += `\n   • Observação do item: _${item.notes.trim()}_`;
      }
      return line;
    }).join('\n\n');

    const paymentLabels: Record<string, string> = {
      pix: 'PIX (Solicitar chave)',
      cartao: 'Cartão (Levar maquininha de cartão)',
      dinheiro: `Dinheiro ${form.changeFor ? `(Troco para ${form.changeFor})` : '(Sem troco)'}`,
    };

    const deliveryAddressText = form.deliveryType === 'delivery'
      ? `${form.address.trim()}${form.neighborhood.trim() ? ` - ${form.neighborhood.trim()}` : ''}`
      : `Retirada no balcão (${storeConfig.address} - ${storeConfig.city})`;

    const observationsText = form.notes.trim() ? form.notes.trim() : 'Nenhuma';

    return [
      `🍔 *PEDIDO #${orderNumber}* - ${storeConfig.name}`,
      `⏰ Horário: ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Nome do Cliente:* ${form.name.trim()}`,
      form.phone.trim() ? `📱 *Telefone:* ${form.phone.trim()}` : null,
      `📍 *Endereço de Entrega:* ${deliveryAddressText}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🛒 *PRODUTOS SELECIONADOS:*`,
      itemsText,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Subtotal dos produtos: ${formatMoney(subtotal)}`,
      form.deliveryType === 'delivery' ? `Taxa de entrega: ${formatMoney(deliveryCost)}` : null,
      `💰 *VALOR TOTAL DO PEDIDO: ${formatMoney(grandTotal)}*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `💳 *Forma de Pagamento:* ${paymentLabels[form.paymentMethod]}`,
      `📝 *Observações Adicionais:* ${observationsText}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Por favor, confirme a disponibilidade e o tempo de entrega. Muito obrigado!_`
    ].filter(Boolean).join('\n');
  };

  const validateOrder = (): boolean => {
    if (cart.length === 0) {
      setFormError('Adicione pelo menos um produto ao carrinho antes de solicitar.');
      return false;
    }
    if (!form.name.trim()) {
      setFormError('Por favor, informe o seu nome para identificação do pedido.');
      return false;
    }
    if (form.deliveryType === 'delivery' && !form.address.trim()) {
      setFormError('Por favor, informe o endereço de entrega (rua e número).');
      return false;
    }
    setFormError(null);
    return true;
  };

  const officialNumber = storeConfig.whatsappNumber ? storeConfig.whatsappNumber.replace(/\D/g, '') : '244932727291';
  const targetWhatsappNumber = officialNumber || '244932727291';

  const handleSendWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!validateOrder()) {
      e.preventDefault();
      return;
    }
  };

  const handleCopyMessage = async () => {
    if (!validateOrder()) return;
    const msg = buildWhatsAppMessage();
    try {
      await navigator.clipboard.writeText(msg);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    } catch {
      // Fallback
    }
  };

  const encodedText = encodeURIComponent(buildWhatsAppMessage());
  const whatsappUrl = `https://wa.me/${targetWhatsappNumber}?text=${encodedText}`;

  return (
    <section id="carrinho" className="pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#292929]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff7900]/20 flex items-center justify-center text-[#ff7900]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bebas text-3xl sm:text-4xl uppercase tracking-wider text-white">
                O seu <span className="text-[#ff7900]">Pedido</span>
              </h2>
              <p className="text-xs text-zinc-400">
                Confira os itens selecionados e finalize diretamente pelo WhatsApp
              </p>
            </div>
          </div>

          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar carrinho</span>
            </button>
          )}
        </div>

        {/* Cart Container Box */}
        <div className="bg-[#121212] border border-[#2b2b2b] rounded-2xl p-4 sm:p-6 shadow-xl">
          
          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center text-zinc-400 mb-3">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-base font-semibold text-zinc-300">O seu carrinho está vazio</p>
              <p className="text-xs text-zinc-400 mt-1 max-w-sm">
                Selecione os hambúrgueres e acompanhamentos acima para montar o seu lanche favorito.
              </p>
              <a
                href="#cardapio"
                className="mt-4 text-xs font-bold text-[#ff7900] hover:underline uppercase tracking-wider"
              >
                Explorar Cardápio
              </a>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-[#222222]">
              {cart.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-oswald text-base sm:text-lg font-bold uppercase text-white">
                          {item.product.name}
                        </span>
                        <span className="text-xs text-zinc-400">
                          ({formatMoney(item.product.price)} un)
                        </span>
                      </div>
                      {item.notes && (
                        <p className="text-xs text-[#ff9b24] italic mt-0.5">
                          Obs: {item.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      {/* Quantity buttons */}
                      <div className="flex items-center bg-[#0a0a0a] border border-[#333] rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 rounded bg-[#1c1c1c] text-white flex items-center justify-center hover:bg-[#2b2b2b]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 rounded bg-[#1c1c1c] text-white flex items-center justify-center hover:bg-[#2b2b2b]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="font-mono text-sm sm:text-base font-bold text-white min-w-[70px] text-right">
                        {formatMoney(itemTotal)}
                      </span>

                      {/* Remove item */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-zinc-400 hover:text-red-400 p-1 transition-colors"
                        title="Remover item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pricing Summary */}
          {cart.length > 0 && (
            <div className="mt-6 pt-5 border-t border-[#292929] space-y-2 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal dos itens</span>
                <span className="font-mono text-white">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Taxa de Entrega</span>
                <span className="font-mono text-white">
                  {form.deliveryType === 'delivery' ? formatMoney(deliveryCost) : 'Grátis (Retirada)'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#292929] text-lg sm:text-2xl font-black">
                <span className="font-oswald uppercase tracking-wider text-white">Total do Pedido</span>
                <span className="font-mono text-[#ff7900] text-xl sm:text-3xl font-black">
                  {formatMoney(grandTotal)}
                </span>
              </div>
            </div>
          )}

          {/* Customer Details & Delivery Form */}
          {cart.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#292929]">
              <h3 className="font-oswald text-lg uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <span>Dados de Entrega & Pagamento</span>
              </h3>

              {/* Delivery Type Toggle */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, deliveryType: 'delivery' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    form.deliveryType === 'delivery'
                      ? 'bg-[#ff7900]/15 border-[#ff7900] text-[#ff7900]'
                      : 'bg-[#181818] border-[#2f2f2f] text-zinc-400 hover:text-white'
                  }`}
                >
                  <Bike className="w-4 h-4" />
                  <span>Entrega (+{formatMoney(storeConfig.deliveryFee)})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setForm({ ...form, deliveryType: 'pickup' })}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    form.deliveryType === 'pickup'
                      ? 'bg-[#ff7900]/15 border-[#ff7900] text-[#ff7900]'
                      : 'bg-[#181818] border-[#2f2f2f] text-zinc-400 hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Retirar no Balcão</span>
                </button>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Nome */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (formError) setFormError(null);
                    }}
                    placeholder="Ex: João Silva"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none placeholder:text-zinc-600 transition-colors"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Telefone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Ex: 932 727 291"
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none placeholder:text-zinc-600 transition-colors"
                  />
                </div>

                {/* Endereço (se entrega) */}
                {form.deliveryType === 'delivery' && (
                  <>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Endereço de Entrega (Rua e Número) *
                      </label>
                      <input
                        type="text"
                        value={form.address}
                        onChange={(e) => {
                          setForm({ ...form, address: e.target.value });
                          if (formError) setFormError(null);
                        }}
                        placeholder="Ex: Av. Principal, 450 - Apto 12"
                        className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none placeholder:text-zinc-600 transition-colors"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                        Bairro e Ponto de Referência
                      </label>
                      <input
                        type="text"
                        value={form.neighborhood}
                        onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
                        placeholder="Ex: Bairro Centro, próximo à praça matriz"
                        className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none placeholder:text-zinc-600 transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Forma de Pagamento */}
                <div className="sm:col-span-2 mt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'pix' })}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                        form.paymentMethod === 'pix'
                          ? 'bg-[#ff7900]/15 border-[#ff7900] text-[#ff7900]'
                          : 'bg-[#0a0a0a] border-[#2b2b2b] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>PIX</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'cartao' })}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                        form.paymentMethod === 'cartao'
                          ? 'bg-[#ff7900]/15 border-[#ff7900] text-[#ff7900]'
                          : 'bg-[#0a0a0a] border-[#2b2b2b] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Cartão</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setForm({ ...form, paymentMethod: 'dinheiro' })}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 text-xs font-semibold transition-all cursor-pointer ${
                        form.paymentMethod === 'dinheiro'
                          ? 'bg-[#ff7900]/15 border-[#ff7900] text-[#ff7900]'
                          : 'bg-[#0a0a0a] border-[#2b2b2b] text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Banknote className="w-4 h-4" />
                      <span>Dinheiro</span>
                    </button>
                  </div>

                  {form.paymentMethod === 'dinheiro' && (
                    <div className="mt-2.5">
                      <input
                        type="text"
                        value={form.changeFor}
                        onChange={(e) => setForm({ ...form, changeFor: e.target.value })}
                        placeholder="Precisa de troco para quanto? (Ex: R$ 50)"
                        className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-xs outline-none placeholder:text-zinc-600"
                      />
                    </div>
                  )}
                </div>

                {/* Observações Gerais */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    Observações do Pedido (Opcional)
                  </label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Ex: Mandar sachês de maionese temperada, tocar o interfone 22..."
                    className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none placeholder:text-zinc-600 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Error Alert Display */}
              {formError && (
                <div className="mt-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl flex items-center gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Action Buttons: WhatsApp Checkout + Copy text fallback */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={whatsappUrl}
                  onClick={handleSendWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#ff7900] via-[#ff8f1f] to-[#e66800] hover:brightness-110 active:scale-[0.99] text-black font-bebas text-2xl tracking-wider uppercase rounded-xl shadow-[0_4px_25px_rgba(255,121,0,0.4)] flex items-center justify-center gap-3 transition-all cursor-pointer text-center"
                >
                  <Send className="w-6 h-6 stroke-[2.5]" />
                  <span>Solicitar pelo WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full py-2.5 px-4 bg-[#181818] hover:bg-[#222222] border border-[#333] text-zinc-300 hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Mensagem copiada para a área de transferência!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar resumo do pedido</span>
                    </>
                  )}
                </button>
              </div>

              {/* Customer Guarantee Note */}
              <p className="mt-4 text-[11px] text-zinc-400 text-center leading-relaxed">
                Ao clicar no botão, uma mensagem pré-formatada será aberta no WhatsApp da hamburgueria. O tempo de entrega e confirmação final serão informados pela equipe.
              </p>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
