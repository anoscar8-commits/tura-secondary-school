import { useState } from 'react';
import { X, Check, Copy, Terminal, Globe, Smartphone, Image as ImageIcon, Calendar, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeploymentGuideModal({ isOpen, onClose }: DeploymentGuideModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      num: 1,
      title: 'Ku-run Website Kwenye Kompyuta Yako (Local Run)',
      icon: Terminal,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Hakikisha una <strong>Node.js</strong> (toleo la 18 au zaidi) kwenye kompyuta yako. Kisha fungua Terminal/Command Prompt kwenye folda ya mradi na uendeshe:
          </p>
          <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs relative flex items-center justify-between">
            <code>npm install && npm run dev</code>
            <button
              onClick={() => copyCode('npm install && npm run dev', 1)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              title="Nakili"
            >
              {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p>
            Fungua kivinjari chako (Chrome, Firefox, Edge) na uingie kwenye anwani: <code className="bg-slate-100 text-blue-700 font-bold px-1.5 py-0.5 rounded">http://localhost:3000</code> au nambari ya port inayoonekana kwenye screen.
          </p>
        </div>
      ),
    },
    {
      num: 2,
      title: 'Ku-test Kwenye Simu Yako (Mobile Testing)',
      icon: Smartphone,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>Kujaribu website kwenye simu yako ukiwa kwenye mtandao mmoja wa Wi-Fi:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Angalia IP address ya kompyuta yako (mfano: <code>192.168.1.45</code>).</li>
            <li>
              Endesha amri: <code className="bg-slate-100 px-1 rounded font-mono">npm run dev -- --host</code>
            </li>
            <li>Kwenye simu yako, fungua Chrome au Safari na uandike: <code className="bg-blue-50 text-blue-800 font-bold px-1.5 py-0.5 rounded font-mono">http://192.168.1.45:3000</code></li>
          </ol>
        </div>
      ),
    },
    {
      num: 3,
      title: 'Ku-deploy Online & Kupata Public URL (Bure kwa Beginner)',
      icon: Globe,
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-slate-600">
          <p>
            Ili watu duniani kote waweze kuona website kupitia link ya intaneti (kama vile WhatsApp au mitandao ya kijamii), tunapendekeza huduma zifuatazo ambazo ni <strong>bure 100%</strong>:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Njia ya 1: Vercel (Rahisi Zaidi)</span>
              <p className="text-xs text-slate-500 mt-1">
                1. Tembelea <code>vercel.com</code> na ufungue akaunti ya bure.<br />
                2. Unganisha repository yako ya GitHub au buruta (drag-and-drop) folda ya <code>dist</code> baada ya kuendesha <code>npm run build</code>.<br />
                3. Utapata link ya bure papo hapo: <code>https://tura-secondary-2026.vercel.app</code>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-slate-900 block">Njia ya 2: Netlify</span>
              <p className="text-xs text-slate-500 mt-1">
                1. Tembelea <code>netlify.com</code>.<br />
                2. Baada ya <code>npm run build</code>, buruta folda ya <code>dist</code> moja kwa moja kwenye Netlify Drop.<br />
                3. Website inakuwa hewani ndani ya sekunde 15!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: 4,
      title: 'Kubadilisha na Kupakia Picha Mpya',
      icon: ImageIcon,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Website hii ina mfumo wa moja kwa moja (Built-in Image Manager):
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bonyeza kitufe cha kijani cha <strong>&quot;Simamia Tovuti&quot;</strong> juu kulia au <strong>&quot;Pakia Picha Zako Hapa&quot;</strong> kwenye sehemu ya picha.</li>
            <li>Weka nenosiri la usimamizi (la awali ni: <code>tura2026</code>).</li>
            <li>Chagua picha yako kutoka simu au kompyuta (JPG, JPEG, PNG, WEBP).</li>
            <li>Weka kichwa cha picha, maelezo (caption), na aina (category: Wahitimu, Walimu, Wageni, nk).</li>
            <li>Picha inabanwa kiotomatiki (compressed) na kuonekana papo hapo kwenye tovuti bila kurekebisha code yoyote!</li>
          </ul>
        </div>
      ),
    },
    {
      num: 5,
      title: 'Kubadilisha Ratiba na Taarifa za Shule',
      icon: Calendar,
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-slate-600">
          <p>
            Kwenye jopo lile lile la <strong>&quot;Simamia Tovuti&quot;</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Chagua kichupo cha <strong>&quot;Ratiba&quot;</strong> ili kubadilisha saa (08:00, 09:00, nk) na kuweka shughuli halisi badala ya placeholders.</li>
            <li>Chagua kichupo cha <strong>&quot;Taarifa za Shule & Matini&quot;</strong> ili kubadilisha maneno ya Karibu, risala ya shule, au anwani ya Uyui Tabora.</li>
            <li>Kila kitu kinahifadhiwa mara moja!</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-blue-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight">
                Mwongozo Kamili wa Ku-Run & Ku-Deploy Mtandaoni
              </h2>
              <p className="text-xs text-blue-200">
                Tura Secondary School – Mahafali ya Kidato cha Nne 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs sm:text-sm flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <p>
              Website hii imejengwa kwa teknolojia ya kisasa ya <strong>React, TypeScript na Vite</strong> ikiwa na utendaji wa haraka sana, muonekano maridadi kwenye simu, na uwezo wa kubadilisha picha na ratiba moja kwa moja.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-blue-900 text-white font-black text-xs flex items-center justify-center">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-blue-600" />
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <div>{step.content}</div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-center text-xs text-slate-600">
            Je, unahitaji msaada wowote zaidi? Bonyeza kitufe cha <strong>&quot;Simamia Tovuti&quot;</strong> kwenye ukurasa wa mwanzo wakati wowote kuanza kuongeza picha halisi!
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
          >
            Nimeelewa, Funga Mwongozo
          </button>
        </div>
      </div>
    </div>
  );
}
