import React, { useState } from 'react';
import { X, Save, Phone, MapPin, DollarSign, Clock, Check } from 'lucide-react';
import { StoreConfig } from '../types';

interface StoreSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  onSave: (newConfig: StoreConfig) => void;
}

export const StoreSettingsModal: React.FC<StoreSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [form, setForm] = useState<StoreConfig>({ ...config });
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg bg-[#141414] border border-[#333] rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#1c1c1c] border-b border-[#2d2d2d] px-5 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bebas text-2xl uppercase tracking-wider text-white">
              Configurações da Hamburgueria
            </h2>
            <p className="text-xs text-zinc-400">
              Personalize o WhatsApp de recebimento e os dados do estabelecimento
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#292929] hover:bg-[#383838] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          
          {/* WhatsApp Number (Key requirement) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#ff7900] mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              <span>Número de WhatsApp do Estabelecimento *</span>
            </label>
            <input
              type="text"
              required
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              placeholder="Ex: 244932727291"
              className="w-full px-3.5 py-2.5 bg-[#0a0a0a] border border-[#3a3a3a] focus:border-[#ff7900] rounded-xl text-white font-mono text-sm outline-none"
            />
            <p className="text-[11px] text-zinc-400 mt-1">
              Número oficial configurado: <code className="text-[#ff9b24] font-bold">244932727291</code> (+244 932 727 291).
            </p>
          </div>

          {/* Nome da Hamburgueria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Nome do Estabelecimento
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Telefone de Exibição
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none"
              />
            </div>
          </div>

          {/* Endereço & Cidade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#ff7900]" />
                <span>Endereço</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                Cidade / Estado
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none"
              />
            </div>
          </div>

          {/* Taxa de Entrega e Horário */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-[#ff7900]" />
                <span>Taxa de Entrega (R$)</span>
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={form.deliveryFee}
                onChange={(e) => setForm({ ...form, deliveryFee: parseFloat(e.target.value) || 0 })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#ff7900]" />
                <span>Horário de Atendimento</span>
              </label>
              <input
                type="text"
                value={form.openingHours}
                onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#0a0a0a] border border-[#333] focus:border-[#ff7900] rounded-xl text-white text-sm outline-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#292929] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                saved
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#ff7900] hover:bg-[#ff8f1f] text-black shadow-[0_2px_15px_rgba(255,121,0,0.4)]'
              }`}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Salvo com sucesso!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 stroke-[2.5]" />
                  <span>Salvar Alterações</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
