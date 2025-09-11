import { Link } from "react-router-dom"

type StatisticsCardProps = {
    count: number;
    title: string;
    link: string;
    icon: string;
}

const StatisticsCard = ({ count, title, link, icon }: StatisticsCardProps) => {
    return (
        <div className="col-span-12 md:col-span-6">
            <div className="relative min-h-[300px] flex flex-col justify-between bg-white card-shadow rounded-[15px] z-2 py-5 px-7 group">
                <figure>
                    <figcaption>
                        <h4 className="text-[16px] font-medium text-gray-600">{title}</h4>
                        <h1 className="text-[60px]">{count}</h1>
                    </figcaption>
                    <i className={`${icon} block w-auto centered text-primary group-hover:btn-shadow text-[38px] absolute top-5 right-7 -z-1 bg-emerald-50 p-[12px] rounded-[23%] group-hover:text-[45px] transition-3s`}></i>
                </figure>
                <Link to={link} className="flex justify-between items-center btn-shadow bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-4 rounded-[15px] hover:transform hover:-translate-y-[5px] transition-all duration-[800ms] ease-in-out">
                    <span>More info</span> <i className="fas fa-circle-arrow-right mx-2"></i>
                </Link>
            </div>
        </div>
    )
}

export default StatisticsCard