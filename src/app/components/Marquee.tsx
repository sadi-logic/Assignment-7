import MarqueeText from "react-marquee-text";


export interface Products {
    id: number,
    today: number,
    nameBn: string,
    categoryIcon: string,
    unit: string,
    change: {
        dir: "up" | "down";
        pct: number;
    };
}

const Marquee = async () => {

    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            next: {
                revalidate: 60,
            },
        }
    );

    const data = await res.json();

    const products: Products[] = data;

    return (
        <div>
            <div className="flex pl-5">
                <MarqueeText
                    duration={10}
                    direction="right"
                    className="py-2"
                >
                    {
                        products.map((p) => (
                            <span key={p.id}>
                                <span>{p.categoryIcon}</span>
                                <span>{p.nameBn}</span>
                                <span className="ml-2">
                                    {p.today} টাকা/{p.unit}
                                </span>
                                <span className={`font-bold ml-2 ${p.change.dir === "up" ? "text-red-400 " : "text-green-400"
                                    }`}>
                                    {p.change.dir === "up" ? "▲" : "▼"}
                                    {p.change.pct}%
                                </span>

                                <span className="mx-5 text-white">◉</span>
                            </span>
                        ))}
                </MarqueeText>
            </div>
        </div>
    )
};

export default Marquee;