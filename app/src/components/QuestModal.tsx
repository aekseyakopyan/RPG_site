import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, Target } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const formSchema = z.object({
    name: z.string().min(2, "Имя слишком короткое"),
    contact: z.string().min(5, "Оставьте хотя бы Telegram или телефон"),
    project: z.string().optional(),
});

interface QuestModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageName: string;
    serviceName: string;
}

export function QuestModal({ isOpen, onClose, packageName, serviceName }: QuestModalProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            contact: '',
            project: '',
        }
    });

    const onSubmit = async (data: any) => {
        // В реальном проекте здесь будет отправка в Telegram/CRM
        console.log('Quest Started:', { ...data, packageName, serviceName });
        await new Promise(resolve => setTimeout(resolve, 2000));
        reset();
        onClose();
        // Можно добавить уведомление об успехе через sonner
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-[#1a1a2e] border-2 border-rpg-gold text-white p-0 overflow-hidden rounded-[32px]">
                <div className="absolute top-0 left-0 w-full h-2 bg-rpg-gold" />

                <div className="p-8">
                    <DialogHeader className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="p-2 bg-rpg-gold/10 rounded-lg text-rpg-gold">
                                <Target className="w-5 h-5" />
                            </span>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rpg-gold/60">Новое задание</p>
                        </div>
                        <DialogTitle className="text-3xl font-black uppercase tracking-tight leading-none italic">
                            НАЧАТЬ КВЕСТ: <br />
                            <span className="text-rpg-gold">{packageName}</span>
                        </DialogTitle>
                        <p className="text-gray-400 text-sm font-bold mt-4">
                            Оставьте данные, и я свяжусь с вами, чтобы обсудить стратегию захвата рынка для {serviceName}.
                        </p>
                    </DialogHeader>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Имя героя</label>
                            <input
                                {...register('name')}
                                placeholder="Как вас зовут?"
                                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-white focus:border-rpg-gold outline-none transition-all font-bold"
                            />
                            {errors.name && <p className="text-red-400 text-[10px] font-black uppercase ml-1">{errors.name.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Средство связи</label>
                            <input
                                {...register('contact')}
                                placeholder="Telegram или Телефон"
                                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-white focus:border-rpg-gold outline-none transition-all font-bold"
                            />
                            {errors.contact && <p className="text-red-400 text-[10px] font-black uppercase ml-1">{errors.contact.message as string}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">О проекте (по желанию)</label>
                            <textarea
                                {...register('project')}
                                placeholder="На какой никнейм/сайт делать аудит?"
                                className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-5 py-4 text-white focus:border-rpg-gold outline-none transition-all font-bold min-h-[100px] resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full relative group overflow-hidden bg-rpg-gold text-rpg-dark py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSubmitting ? (
                                    "Загрузка..."
                                ) : (
                                    <>
                                        ОТПРАВИТЬ ГОЛУБЯ <Send className="w-4 h-4" />
                                    </>
                                )}
                            </span>
                        </button>

                        <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-wider">
                            Нажимая кнопку, вы соглашаетесь с условиями квеста
                        </p>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
