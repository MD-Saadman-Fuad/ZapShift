import { useState } from "react";

export default function AboutSection() {
    const tabs = ["Story", "Mission", "Success", "Team & Others"];
    const [activeTab, setActiveTab] = useState("Story");

    const content = {
        Story: `
    We started with a simple promise — to make parcel delivery fast, reliable, and stress-free.
    What began as a small initiative has grown into a trusted delivery solution for thousands
    of individuals and businesses. Over the years, our focus on real-time tracking, efficient
    logistics, and a customer-first approach has shaped who we are today.

    From urgent documents to personal gifts and business shipments, we ensure every delivery
    is handled with care and precision. Our commitment to transparency and timely delivery
    remains at the core of everything we do — ensuring your parcel reaches its destination
    on time, every time.
  `,

        Mission: `
    Our mission is simple: to make parcel delivery easier, safer, and more accessible.
    We believe convenience shouldn’t come at the cost of reliability, which is why we
    built a platform that allows anyone to send or receive packages with confidence.

    Through real-time tracking, dedicated customer support, and a strong network of verified
    riders, we aim to deliver an experience that is transparent and worry-free. Every step
    of the process — from pickup to drop-off — is designed to give users complete control
    and peace of mind.

    We are committed to continuous improvement, adopting new technologies and listening to
    our users to make delivery smarter and smoother every day.
  `,

        Success: `
    Our success is driven by the trust of our users and the dedication of our team.
    Over the years, we have achieved major milestones — faster delivery times, wider
    coverage areas, improved app experience, and a continuously growing user base.

    What sets us apart is our ability to adapt quickly. By understanding the needs of
    modern senders and receivers, we constantly innovate to keep pace with the demands
    of today’s fast-moving world.

    As we continue to expand, our focus remains the same: delivering reliability,
    maintaining transparency, and ensuring every customer experience exceeds expectations.
  `,

        "Team & Others": `
    Behind every successful delivery is a team dedicated to excellence. Our riders,
    support team, logistics coordinators, and developers work together to ensure a
    seamless experience for every user — whether you're sending a parcel or waiting
    for one.

    Our riders are trained, verified, and equipped to handle packages of different kinds,
    ensuring safety and timely delivery. Meanwhile, our customer support team is always
    ready to assist, helping users with any questions or concerns.

    Beyond our core team, we collaborate with partners, local businesses, and delivery
    specialists to build a stronger network. Together, we aim to shape the future of
    seamless parcel delivery, one successful delivery at a time.
  `,
    };


    return (
        <section className="max-w-6xl mx-auto px-4 py-16">
            {/* Header */}
            <h2 className="text-3xl font-bold mb-2">About Us</h2>
            <p className="text-gray-600 max-w-2xl mb-12">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
                From personal packages to business shipments — we deliver on time, every time.
            </p>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 font-medium transition-all whitespace-nowrap ${activeTab === tab
                            ? "border-b-2 border-primary"
                            : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="text-gray-700 leading-relaxed">
                <p>{content[activeTab]}</p>
            </div>
        </section>
    );
}
