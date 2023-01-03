import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';
import { Link, useParams } from 'react-router-dom'

interface LessonProps {
    title: string;
    slug: string;
    avaliableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {

    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailableAt = isPast(props.avaliableAt);
    const availableAtDateFormatted = format(props.avaliableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR
    })

    const isSlugActive = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className='group'>
            <span className="text-gray-300">
                {availableAtDateFormatted}
            </span>

            <div className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-colors ${isSlugActive ? 'bg-green-500' : ''}`}>
                <header className="flex items-center justify-between">

                    {isLessonAvailableAt ? (
                        <span className={`text-sm font-medium flex gap-2 items-center ${isSlugActive ? "text-white" : "text-blue-500"}`}>
                            <CheckCircle size={20} />
                            Conteúdo Liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex gap-2 items-center">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}

                    <span className={`text-xs rounded py-[0.125rem] px-2 text-white border font-bold ${isSlugActive ? "border-white": "border-green-300"}`}>
                        {props.type === 'live' ? "AO VIVO" : "AULA PRÁTICA"}
                    </span>
                </header>

                <strong className={`mt-5 block ${isSlugActive ? 'text-white' : 'text-gray-200'}`}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}