import React, { useMemo, useState } from "react";
import "./App.css";

const watchGuides = [
    {
        id: 1,
        brand: "Oris",
        model: "TT1 Day Date",
        movement: "Automatic",
        type: "Everyday",
        budget: "500-1000",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Swiss automatic နာရီကို ပထမဆုံးဝယ်ချင်သူအတွက် value ကောင်းတဲ့ရွေးချယ်မှု။",
        risk: "Box/papers မပါတာ၊ service history စစ်ရန်လို။",
    },
    {
        id: 2,
        brand: "Seiko",
        model: "Prospex Diver",
        movement: "Automatic",
        type: "Diver",
        budget: "under-500",
        image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Budget နည်းပြီး diver style ကြိုက်ရင် စတင်ကြည့်သင့်တဲ့ brand။",
        risk: "မော်ဒယ်အလိုက် case size ကြီးနိုင်လို့ wrist size စစ်ပါ။",
    },
    {
        id: 3,
        brand: "Tissot",
        model: "PRX Powermatic 80",
        movement: "Automatic",
        type: "Everyday",
        budget: "500-1000",
        image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Modern bracelet look နဲ့ နေ့စဉ်ဝတ်လို့ကောင်းတဲ့ Swiss watch။",
        risk: "Bracelet fit နှင့် scratches ကို ဓာတ်ပုံကနေစစ်ပါ။",
    },
    {
        id: 4,
        brand: "Hamilton",
        model: "Khaki Field",
        movement: "Manual/Automatic",
        type: "Field",
        budget: "500-1000",
        image: "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Simple, military style, readable dial ကြိုက်သူတွေအတွက် သင့်တော်တယ်။",
        risk: "Manual winding မော်ဒယ်ဆို နေ့စဉ်လက်ဖြင့် winding လုပ်ရနိုင်။",
    },
    {
        id: 5,
        brand: "Longines",
        model: "HydroConquest",
        movement: "Automatic/Quartz",
        type: "Diver",
        budget: "1000-3000",
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Entry luxury diver အနေနဲ့ brand history ကောင်းပြီး everyday ဝတ်လို့ရတယ်။",
        risk: "Quartz/automatic မတူတာကြောင့် listing ကိုသေချာဖတ်ပါ။",
    },
    {
        id: 6,
        brand: "Omega",
        model: "Seamaster",
        movement: "Automatic",
        type: "Diver",
        budget: "3000-plus",
        image: "https://images.unsplash.com/photo-1609587312208-cea54be969e7?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Luxury diver category မှာ resale value နဲ့ recognition ကောင်းတဲ့ရွေးချယ်မှု။",
        risk: "Fake risk မြင့်နိုင်လို့ papers, serial, seller rating စစ်ရန်အရေးကြီး။",
    },
    {
        id: 7,
        brand: "Rolex",
        model: "Datejust",
        movement: "Automatic",
        type: "Dress",
        budget: "3000-plus",
        image: "https://images.unsplash.com/photo-1629581678313-36cf745a9af9?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Classic luxury watch; dress နဲ့ everyday နှစ်မျိုးလုံးဝတ်လို့ရတယ်။",
        risk: "Aftermarket parts, polish အလွန်များခြင်း, fake dial စစ်ရန်လို။",
    },
    {
        id: 8,
        brand: "Citizen",
        model: "Eco-Drive",
        movement: "Solar",
        type: "Everyday",
        budget: "under-500",
        image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=1200&auto=format&fit=crop",
        burmeseNote: "Battery မကြာခဏလဲစရာမလိုတဲ့ practical daily watch။",
        risk: "အလင်းမရတာကြာရင် charge အားနည်းနိုင်။",
    },
];

const brands = ["အားလုံး", "Seiko", "Citizen", "Tissot", "Hamilton", "Oris", "Longines", "Omega", "Rolex"];
const movements = ["အားလုံး", "Automatic", "Quartz", "Manual", "Solar"];
const types = ["အားလုံး", "Diver", "Dress", "Field", "Everyday"];

const budgets = [
    { value: "all", label: "Budget အားလုံး" },
    { value: "under-500", label: "$500 အောက်" },
    { value: "500-1000", label: "$500 - $1,000" },
    { value: "1000-3000", label: "$1,000 - $3,000" },
    { value: "3000-plus", label: "$3,000 အထက်" },
];

function getBudgetKeyword(budget) {
    const budgetMap = {
        "under-500": "under 500",
        "500-1000": "500 1000",
        "1000-3000": "1000 3000",
        "3000-plus": "over 3000",
    };

    return budgetMap[budget] || "";
}

function chronoSearchUrl({ search, brand, movement, type, budget, model = "" }) {
    const queryParts = [
        brand !== "အားလုံး" ? brand : "",
        model,
        movement !== "အားလုံး" ? movement : "",
        type !== "အားလုံး" ? type : "",
        getBudgetKeyword(budget),
        search,
    ].filter(Boolean);

    const query = encodeURIComponent(queryParts.join(" ").trim() || "automatic watch");
    return `https://www.chrono24.com/search/index.htm?query=${query}`;
}

function App() {
    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("အားလုံး");
    const [movement, setMovement] = useState("အားလုံး");
    const [type, setType] = useState("အားလုံး");
    const [budget, setBudget] = useState("all");

    const filteredGuides = useMemo(() => {
        return watchGuides.filter((watch) => {
            const searchableText = `${watch.brand} ${watch.model} ${watch.type} ${watch.movement}`.toLowerCase();

            const matchesSearch = searchableText.includes(search.toLowerCase());
            const matchesBrand = brand === "အားလုံး" || watch.brand === brand;
            const matchesMovement = movement === "အားလုံး" || watch.movement.toLowerCase().includes(movement.toLowerCase());
            const matchesType = type === "အားလုံး" || watch.type === type;
            const matchesBudget = budget === "all" || watch.budget === budget;

            return matchesSearch && matchesBrand && matchesMovement && matchesType && matchesBudget;
        });
    }, [search, brand, movement, type, budget]);

    const mainChronoLink = chronoSearchUrl({ search, brand, movement, type, budget });

    return (
        <div className="app">
            <header className="hero">
                <div className="hero-content">
                    <p className="badge">Burmese Watch Finder</p>
                    <h1>မြန်မာလို နာရီရွေးမယ်</h1>
                    <p className="hero-text">
                        Budget, brand, movement, style အလိုက် နာရီတွေကို မြန်မာလိုနားလည်လွယ်အောင် ရှာပါ။
                        App ထဲမှာ Chrono24 live listing မကူးထားဘဲ သင်ရွေးထားတဲ့ filter အတိုင်း Chrono24 search results ကိုဖွင့်ပေးသည်။
                    </p>
                </div>

                <div className="filter-box">
                    <h2>နာရီရှာဖွေရန်</h2>

                    <input
                        type="text"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="ဥပမာ - Oris, diver, automatic"
                    />

                    <div className="filters">
                        <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                            {brands.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <select value={movement} onChange={(event) => setMovement(event.target.value)}>
                            {movements.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <select value={type} onChange={(event) => setType(event.target.value)}>
                            {types.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>

                        <select value={budget} onChange={(event) => setBudget(event.target.value)}>
                            {budgets.map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <a className="main-button" href={mainChronoLink} target="_blank" rel="noreferrer">
                        ဒီ Filter နဲ့ Chrono24 မှာ Browse လုပ်ရန်
                    </a>
                </div>
            </header>

            <main className="container">
                <div className="section-header">
                    <div>
                        <p className="small-title">Guide results</p>
                        <h2>နာရီ guide {filteredGuides.length} ခု တွေ့ရှိသည်</h2>
                    </div>
                    <p className="notice">
                        အောက်က cards တွေက Burmese guide cards ဖြစ်သည်။ Real live results များကို ခလုတ်နှိပ်ပြီး Chrono24 search page မှာကြည့်ပါ။
                    </p>
                </div>

                <div className="grid">
                    {filteredGuides.map((watch) => {
                        const link = chronoSearchUrl({
                            search,
                            brand: watch.brand,
                            movement: watch.movement.includes("Automatic") ? "Automatic" : movement,
                            type: watch.type,
                            budget: watch.budget,
                            model: watch.model,
                        });

                        return (
                            <div className="card" key={watch.id}>
                                <img src={watch.image} alt={`${watch.brand} ${watch.model}`} />

                                <div className="card-body">
                                    <p className="brand">{watch.brand}</p>
                                    <h3>{watch.model}</h3>

                                    <div className="tags">
                                        <span>{watch.movement}</span>
                                        <span>{watch.type}</span>
                                        <span>ဈေးနှုန်းမပြပါ</span>
                                    </div>

                                    <p>{watch.burmeseNote}</p>

                                    <div className="risk">
                                        <strong>စစ်ရန်:</strong> {watch.risk}
                                    </div>

                                    <a className="card-button" href={link} target="_blank" rel="noreferrer">
                                        Chrono24 ရလဒ်များဖွင့်ရန်
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <section className="info-grid">
                    <div className="info-card">
                        <h3>Automatic ဆိုတာဘာလဲ?</h3>
                        <p>လက်လှုပ်ရှားမှုကနေ အားသွင်းပြီး အလုပ်လုပ်တဲ့ mechanical movement ဖြစ်သည်။ Battery မလိုသော်လည်း service လိုနိုင်သည်။</p>
                    </div>

                    <div className="info-card">
                        <h3>Box/Papers ဘာကြောင့်အရေးကြီး?</h3>
                        <p>နာရီ၏ history, authenticity, resale value စစ်ရန် ကူညီနိုင်သည်။ မပါလည်းဝယ်လို့ရသော်လည်း စျေးညှိသင့်သည်။</p>
                    </div>

                    <div className="info-card">
                        <h3>ဝယ်ခါနီး စစ်ရန်</h3>
                        <p>Seller rating, return policy, service history, bracelet links, water damage, crystal scratches, serial/reference ကိုစစ်ပါ။</p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;
