import { ParallaxHero } from "@/components/ui/ParallaxHero";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const metadata = {
  title: "Frequently Asked Questions | Red Stag Construction",
  description: "Answers to common questions about Los Angeles construction, permits, costs, and hiring a general contractor."
};

export default function FAQ() {
  const categories = [
    {
      categoryTitle: "General Questions",
      questions: [
        {
          question: "What does a general contractor do",
          answer:
            "A general contractor runs the whole job from preconstruction through final inspection. On a real Los Angeles remodel that means coordinating design consultants, pulling permits, scheduling demolition, managing framing, plumbing, electrical, drywall, inspections, finish trades, and closeout. If you are remodeling in Sherman Oaks, Brentwood, or Beverly Hills, the GC also becomes the person responsible for dealing with LADBS, city-specific departments, hillside engineering requirements, and any HOA review that applies to your property. A good GC does not just hire subs and disappear. They build the schedule, track the budget, enforce quality standards, and keep the site moving when one trade affects the next. Without that central control, jobs stall, inspections get missed, materials arrive out of order, and homeowners end up acting as project manager on their own house. That is usually where costs start climbing and timelines start slipping.",
        },
        {
          question: "How do I know if my contractor is licensed in California",
          answer:
            "In California, the first thing you should ask for is the contractor's CSLB license number, then verify it yourself instead of taking anyone at their word. The Contractors State License Board website shows whether the license is active, what classification the contractor holds, whether workers' compensation is in place, and whether there are bond or disciplinary issues on record. That matters in Los Angeles because so many projects that look simple on paper still trigger permit requirements once you open walls, move plumbing, or alter structure. If someone is proposing to remodel a kitchen in Encino, build an ADU in Studio City, or add square footage in Bel Air without a valid license, that is an immediate problem. You also want to confirm that the business name on the proposal matches the license record and that the person you are talking to is actually tied to that licensed entity. If those details do not line up, stop there.",
        },
        {
          question: "What is the difference between a general contractor and a subcontractor",
          answer:
            "A general contractor holds the prime contract with the homeowner and is responsible for the full job. A subcontractor handles one trade under the GC, like plumbing, electrical, roofing, tile, or HVAC. On a Los Angeles remodel, that distinction matters because the homeowner needs one party accountable for sequencing the whole project, especially when the work crosses multiple trades and multiple inspections. For example, a bathroom remodel in West Hollywood may need demo, framing corrections, plumbing rough, electrical rough, waterproofing, tile, glass, cabinetry, and finish plumbing. Each of those scopes touches the next. A tile sub does not coordinate permit drawings, manage inspection corrections, or reschedule plumbing if framing changes. The general contractor does. If you hire trades individually, you become the coordinator, and that usually creates finger-pointing the first time something is out of sequence or fails inspection. The GC is the one responsible for the overall build, while each subcontractor is responsible only for their own slice of work.",
        },
        {
          question: "Do I need a general contractor for a home remodel",
          answer:
            "For anything beyond light cosmetic work, the practical answer in Los Angeles is usually yes. If you are painting cabinets, changing hardware, or replacing fixtures like-for-like, you may not need a GC. The moment you start moving walls, changing plumbing, upgrading electrical, replacing windows, or doing anything that requires permits, the job becomes much more complicated. In neighborhoods with older housing stock like Sherman Oaks, Studio City, and Burbank, opening walls often reveals outdated wiring, undersized framing, or plumbing that needs correction before the project can continue. In hillside areas like Bel Air or Pacific Palisades, structural and drainage issues are even more sensitive. A licensed GC manages those discoveries without the project turning into chaos. They also keep the job compliant with LADBS or the local city department and make sure the final work can actually pass inspection. If the remodel has real scope, a GC is not overhead. They are the control system for the entire project.",
        },
        {
          question: "How do I verify a contractors license number in California",
          answer:
            "Go directly to the California Contractors State License Board website and use the public license lookup. Enter the license number and review the record in full. Do not stop at whether the status says active. Check the legal business name, license classification, workers' compensation status, bond information, and whether there is a complaint history or disciplinary action attached to the record. If you are hiring someone for a kitchen remodel in Beverly Hills or an ADU in Los Angeles, the classification should make sense for the work they are proposing. You should also compare the CSLB record to the contract, estimate, certificate of insurance, and the name on any permit paperwork. If the contractor is legitimate, those documents should align. If the salesperson gives you one number but the contract is under a different entity, press on that immediately. In California, verification takes a few minutes and can save you from a permitting mess, an insurance gap, or a contractor who should not be running your job at all.",
        },
      ],
    },
    {
      categoryTitle: "Residential Remodeling",
      questions: [
        {
          question: "How long does a kitchen remodel take in Los Angeles",
          answer:
            "A real kitchen remodel in Los Angeles typically takes about eight to fourteen weeks once construction starts, but that assumes the plans are complete, materials are ordered, and permits are already in hand. The timeline shifts based on scope. A straightforward cabinet-and-countertop replacement in Encino moves faster than a full gut remodel in Brentwood where walls are coming down and new beams need engineering. Permit timing also matters. If the project requires LADBS review, you can spend several weeks in plan check before work even begins. Then there are product lead times. Custom cabinetry, specialty appliances, and stone slabs can stretch the schedule if selections are not locked early. The other reality is hidden conditions. In older homes across Studio City, Sherman Oaks, and Burbank, we often find outdated electrical, plumbing not up to current code, or framing corrections once demolition is underway. A contractor who gives you a flat two-week promise on a permitted kitchen remodel is not giving you a serious schedule.",
        },
        {
          question: "Do I need a permit for a kitchen remodel in LA",
          answer:
            "If the kitchen remodel changes plumbing, electrical, walls, windows, or structure, you almost certainly need permits in Los Angeles. Cosmetic updates like painting cabinets or swapping countertops may not trigger permit requirements by themselves, but most real kitchen remodels go beyond that. As soon as you relocate a sink, add circuits for appliances, open walls, move gas lines, or remove part of a bearing wall to open the layout, LADBS is involved. That is especially important in older houses throughout the San Fernando Valley, where electrical upgrades and code corrections are common once work begins. It also matters in neighborhoods with HOA oversight, because the HOA may require plan review even before the city issues approval. If you skip permits and later try to sell, refinance, or insure the home, unpermitted work can create real problems. The safer path is simple: if the kitchen scope affects systems behind the walls or changes the footprint, plan on permitting from the beginning.",
        },
        {
          question: "How long does a bathroom remodel take",
          answer:
            "Most bathroom remodels in Los Angeles land in the four-to-eight-week range once construction starts. A hall bath refresh on a simple footprint moves faster than a primary bath in Beverly Hills or Bel Air with custom stone, specialty plumbing fixtures, and structural adjustments. The biggest schedule variables are waterproofing, inspections, and product lead times. Bathrooms are tight spaces with a lot of trades stacked on top of each other, so sequencing matters. Demo has to happen cleanly, plumbing and electrical rough-ins have to pass inspection, waterproofing needs time to cure properly, tile has to be installed in the correct order, and glass or cabinetry usually comes in near the end. In older homes across Studio City, Burbank, and Sherman Oaks, we also regularly uncover cast iron drains, undersized venting, or framing issues that need correction before tile starts. If someone tells you they can fully gut a permitted bathroom and put it back together in a week, they are either leaving out major steps or planning to skip code requirements.",
        },
        {
          question: "What is included in a full bathroom remodel",
          answer:
            "A full bathroom remodel usually includes demolition down to the studs where needed, disposal, plumbing updates, electrical and lighting changes, ventilation improvements, waterproofing, tile, shower or tub installation, vanity and countertop, fixtures, mirrors, paint, and finish trim. In Los Angeles, a serious remodel also includes code review and permit handling when the scope affects plumbing or electrical systems. Many bathrooms in older neighborhoods like Encino, Sherman Oaks, and Silver Lake need more than finish work. Once the walls open up, we often find old galvanized lines, inadequate exhaust, damaged subfloor, or shower assemblies that were never waterproofed correctly. A real full remodel addresses those issues instead of covering them up. On higher-end jobs in Beverly Hills, Brentwood, or Bel Air, the scope may also include heated floors, curbless showers, custom stone fabrication, frameless glass, and upgraded lighting design. The exact inclusions should be spelled out clearly in the proposal so you know what is actually being priced and built.",
        },
        {
          question: "Can I live in my home during a remodel",
          answer:
            "Sometimes yes, but it depends on the size of the project and how much of the house is affected. If you are remodeling one bathroom and there is another functioning bathroom available, most homeowners stay in place. A one-room kitchen remodel is also possible to live through, but you should expect dust control, noise, interrupted utilities, and a period without a working kitchen. That becomes much harder in a whole-home remodel, a major addition, or any project involving multiple system shutoffs. In Los Angeles, older homes often reveal surprises once demolition starts, and that can increase the amount of disruption quickly. If you are in a hillside property in Bel Air or a tight urban site in West Hollywood, logistics can also affect access and daily use of the home. The honest answer is that living through construction is possible on some projects, but it is rarely comfortable. A good contractor should tell you clearly whether staying is realistic or whether temporary relocation makes more sense.",
        },
        {
          question: "How do I prepare my home for a remodel",
          answer:
            "Start by clearing the work area completely and assume the dust will travel farther than you want it to. Remove valuables, artwork, small electronics, and anything fragile from adjacent rooms, not just the room being remodeled. If the project is in the kitchen, set up a temporary food prep area somewhere else in the house. If it is a bathroom remodel, plan exactly which bathroom the household will use during construction. In Los Angeles homes, especially older ones in neighborhoods like Burbank, Studio City, and Sherman Oaks, remodels often involve opening walls, which means more noise and dust than homeowners expect. You should also discuss parking, delivery access, pet containment, and daily entry procedures with your contractor before the first day of work. If you live in a gated community or HOA-controlled neighborhood such as Hidden Hills or certain parts of Calabasas, confirm site access rules early. Preparation is not glamorous, but it directly affects how smooth the first two weeks of construction feel.",
        },
      ],
    },
    {
      categoryTitle: "Custom Homes and ADUs",
      questions: [
        {
          question: "How long does it take to build a custom home in Los Angeles",
          answer:
            "A custom home in Los Angeles typically takes sixteen to twenty-four months from permit approval to move-in, and the total timeline is longer when you include design, engineering, and plan check. Site conditions drive a lot of that schedule. A flatter infill lot in the Valley moves differently than a hillside build in Bel Air, Brentwood, or Malibu where grading, retaining, caissons, and drainage engineering become major parts of the job. You also have jurisdictional issues. LADBS, coastal overlays, fire-zone requirements, and HOA design review can all add time before construction even begins. During the build itself, long-lead windows, custom steel, imported stone, and specialty millwork can stretch the schedule if decisions are delayed. The biggest mistake owners make is assuming the timeline starts when they are emotionally ready. It starts when the plans are complete, the permit is approved, financing is set, and the build team is actually mobilized. A contractor who gives you a short custom-home timeline without explaining those variables is simplifying a very complex process.",
        },
        {
          question: "What is the difference between an ADU and a home addition",
          answer:
            "An ADU is a separate legal dwelling unit. A home addition expands the existing primary residence. That distinction affects design, permitting, utilities, value, and how the finished space can be used. In Los Angeles, an ADU can often be rented separately, house family members, or function as a fully independent residence with its own kitchen and bath. A home addition adds square footage to the main house and usually shares the household systems and occupancy of that existing residence. On paper, both add livable area, but the code path is different. ADUs are governed by California ADU laws and local implementation rules, while additions are tied more directly to zoning, setbacks, floor area ratio, and the requirements of the existing structure. In neighborhoods like Sherman Oaks or Encino, the right choice depends on your lot, your long-term goals, and whether you want independent rental income or more room inside the main house. A good builder should explain both options clearly before design starts.",
        },
        {
          question: "How much does an ADU cost in Los Angeles",
          answer:
            "For most Los Angeles projects, a realistic ADU budget starts around one hundred fifty thousand dollars and can rise well above three hundred thousand depending on size, site conditions, utility work, and finish level. A garage conversion on a straightforward lot is one thing. A detached ADU on a hillside property with retaining, drainage work, upgraded services, and premium finishes is another. In neighborhoods like Studio City, Sherman Oaks, and Encino, many homeowners are surprised by how much utility coordination and site work affects the final number. Sewer connection, electrical service upgrades, new gas runs, and grading can move the budget significantly before you get to cabinets and tile. Then there is the design and permit side. Engineering, Title 24, structural review, and LADBS approval all add real preconstruction cost. The safest way to think about ADU pricing in Los Angeles is not as a single average number, but as a range shaped by lot conditions, access, jurisdictional requirements, and how finished you want the unit to feel when it is complete.",
        },
        {
          question: "Do I need a permit to build an ADU in LA",
          answer:
            "Yes. In Los Angeles, you absolutely need permits to build an ADU. There is no serious version of legal ADU construction that bypasses planning, plan check, and inspection. The process usually includes site feasibility review, architectural plans, structural engineering, energy compliance, and submittal through LADBS or the relevant local authority if you are outside the city proper. Even though California has made ADUs easier to approve than they used to be, that does not mean the process is casual. Setbacks, access, fire separation, utility requirements, drainage, and the existing condition of the property all matter. In hillside or high-value neighborhoods like Bel Air, Brentwood, or Pacific Palisades, site-specific conditions can make the review more technical. If someone tells you they can build an ADU without permits and call it storage, a pool house, or flexible bonus space, that should be a red flag. If it is intended to function as living space, you need to build it legally from the start.",
        },
        {
          question: "Can I rent out my ADU in Los Angeles",
          answer:
            "In most cases, yes, but you need to understand the current local rules and how they apply to your property. A legal ADU in Los Angeles is often rentable as long-term housing, and that is one of the main reasons homeowners build them. People use ADUs for family housing, guest accommodations, and income generation across neighborhoods like Sherman Oaks, Studio City, and Encino. The important part is that the unit has to be permitted and finalized as a legal dwelling unit. If you build a so-called guest house without proper approvals and then rent it, you are taking on real risk. You also need to check whether your property has any special HOA restrictions, local occupancy rules, or financing requirements that affect rental use. In higher-end neighborhoods, the issue is not usually whether the unit is rentable in theory, but whether it was designed, permitted, and completed in a way that makes it legally defensible. A contractor should build the unit for the use you actually intend, not for a workaround.",
        },
      ],
    },
    {
      categoryTitle: "Permits and Compliance",
      questions: [
        {
          question: "How long does it take to get a building permit in Los Angeles",
          answer:
            "For many residential projects in Los Angeles, permit approval takes around four to eight weeks, but that is only a broad planning range. Some projects move faster, and others take much longer depending on what is being built and where the property is located. A simple interior remodel with clear plans may move through LADBS more efficiently than a hillside addition in Bel Air or a custom home in Pacific Palisades where structural review, grading, fire-zone concerns, and extra agency coordination come into play. If an HOA or architectural review board is involved, that can add another layer before the city even signs off. The quality of the plans matters just as much as the jurisdiction. Incomplete drawings, vague scope descriptions, or missing engineering almost always trigger corrections and delays. Homeowners often think permit time is just waiting in line. In reality, it is partly city review and partly how well the project team prepared the submittal before it ever hit the counter.",
        },
        {
          question: "What projects require a building permit in LA",
          answer:
            "In Los Angeles, any project that changes structure, relocates plumbing, alters electrical systems, modifies mechanical systems, replaces windows in a permitted scope, or adds square footage generally requires a permit. That covers a lot more work than people think. A kitchen remodel with new circuits or relocated plumbing is not just cosmetic. A bathroom gut with new waterproofing, drains, lighting, and ventilation usually needs permits. Additions, ADUs, retaining walls over threshold heights, deck work, and most custom home construction are obviously permitted, but even smaller remodels can trigger review once walls open up. In older homes throughout Sherman Oaks, Burbank, and Studio City, code corrections often become part of the permitted scope because the existing conditions are outdated. If you are unsure, ask before work starts. The worst time to find out a permit was required is when the city issues a stop-work notice, an inspector flags unapproved construction, or a buyer raises questions during escrow about work that was never legally signed off.",
        },
        {
          question: "What happens if I build without a permit in California",
          answer:
            "Building without a permit can lead to stop-work orders, correction notices, penalties, forced demolition of noncompliant work, and expensive retroactive engineering or plan review. In California, and especially in Los Angeles, unpermitted construction can also become a serious problem during sale, refinance, or insurance review. If a buyer sees a new ADU, addition, or major remodel and there is no permit history to support it, that becomes a negotiation point immediately. Lenders and insurers also pay attention when improvements do not match the public record. In hillside neighborhoods or HOA-controlled areas, the consequences can be even more painful because the underlying issues are often structural, drainage-related, or subject to design restrictions. Homeowners are sometimes told that skipping permits saves time and money. In reality, it usually shifts the cost downstream into penalties, delays, and loss of negotiating position when you eventually need the house to stand up to scrutiny. Legal work costs money upfront, but unpermitted work is often far more expensive to clean up later.",
        },
        {
          question: "What is LADBS and how does it work",
          answer:
            "LADBS stands for the Los Angeles Department of Building and Safety. For most properties within the City of Los Angeles, it is the agency that reviews plans, issues permits, and inspects construction for code compliance. If you are doing a kitchen remodel, bathroom remodel, addition, ADU, or custom home within city limits, LADBS is usually a major part of the process. The workflow generally starts with plan preparation, then submittal, plan check comments, revisions if needed, permit issuance, and inspections during construction. Depending on the project, other agencies or reviews can also tie in, such as planning, grading, or energy compliance. Homeowners often think of LADBS as a single counter where you get a stamp. In practice, it is an approval process that rewards complete documentation and punishes vague or incomplete submissions. A contractor experienced in Los Angeles will know how to prepare for that. The goal is not just to pull a permit, but to move the project through review and inspection without repeated corrections or unnecessary downtime.",
        },
        {
          question: "How do HOA requirements affect my remodel",
          answer:
            "HOA requirements can affect your remodel before the city even reviews the plans. In communities with active associations, the HOA may regulate exterior finishes, window selections, rooflines, fencing, hardscape, color palettes, equipment screening, and even contractor access rules. That is common in parts of Calabasas, Hidden Hills, Brentwood enclaves, and other high-control neighborhoods where architectural consistency matters. A homeowner can have a design they love and still be forced to revise it if the HOA rejects visible changes. The timing issue matters too. HOA review can add weeks to the preconstruction process, especially if the board meets on a fixed schedule and asks for revisions. That means your city permit timeline and your construction start date may both shift. On the jobsite side, HOAs also affect delivery windows, parking, noise rules, and daily access. A good contractor accounts for HOA requirements early and treats them as part of the entitlement process, not as an afterthought once the plans are already priced and ready to build.",
        },
      ],
    },
    {
      categoryTitle: "Cost and Financing",
      questions: [
        {
          question: "How much does a home remodel cost in Los Angeles",
          answer:
            "There is no serious single number for remodel cost in Los Angeles because the market spans everything from focused interior updates to major structural rework in high-value neighborhoods. A bathroom remodel may start around the mid-five figures, while a kitchen can run much higher, and full-home renovations or additions can move into six-figure territory quickly. The cost difference between a straightforward Valley remodel and a premium project in Bel Air, Brentwood, or Beverly Hills is real. Labor costs are higher here, permit requirements are stricter, and finish expectations are often much higher than national averages assume. Once you add structural changes, custom cabinetry, high-end appliances, steel, drainage work, or hillside engineering, the number climbs fast. That is why homeowners get into trouble when they rely on online averages from outside Southern California. The right way to price a Los Angeles remodel is to look at your actual scope, your neighborhood, your property conditions, and the level of finish you expect when the project is complete.",
        },
        {
          question: "What factors affect the cost of a remodel in LA",
          answer:
            "Scope is the first driver, but it is far from the only one. In Los Angeles, cost is shaped by labor pricing, permit requirements, structural conditions, access, material selections, and neighborhood-specific constraints. A kitchen remodel in Studio City on a simple flat lot is one thing. A similar scope in Bel Air with hillside logistics, restricted access, custom millwork, and premium stone is another. Age of the home matters too. In Sherman Oaks, Burbank, and other older neighborhoods, opening walls often reveals wiring, plumbing, and framing issues that need correction before finish work can continue. Then there are soft costs and compliance requirements: engineering, Title 24, plan check, and inspections. Homeowners also underestimate lead times and how product choices affect labor. Large-format tile, custom cabinetry, imported plumbing fixtures, and specialty windows all change the job. The reason two projects with similar square footage price differently is usually not mystery. It is the combination of scope, hidden conditions, city requirements, and finish level.",
        },
        {
          question: "Do contractors offer financing",
          answer:
            "Some contractors do, some do not, and many work with outside financing partners rather than carrying the financing themselves. In Los Angeles, financing conversations are common on remodels, additions, and ADUs because the project budgets are substantial and homeowners want flexibility around cash flow. The important thing is to separate the construction contract from the financing terms and understand both clearly. A contractor may connect you with a lender, but that does not automatically mean the financing is the best fit for your project or your timeline. You should ask whether the financing is fixed or variable, how funds are released, whether there are draw conditions tied to inspections, and what happens if the project scope changes midstream. On larger jobs in Beverly Hills, Pacific Palisades, or custom-home territory, financing coordination can affect schedule because the lender may require documentation before releases. If financing is part of the plan, it should be addressed early so the project does not stall later because funds are not lined up properly.",
        },
        {
          question: "How do I avoid cost overruns on a construction project",
          answer:
            "The best way to avoid cost overruns is to make major decisions before demolition starts and to work from a scope that is actually detailed enough to build from. In Los Angeles, overruns often come from vague assumptions, incomplete drawings, late material selections, and homeowners changing direction once the job is already underway. Another common cause is hiring someone who gives a low number upfront and then bills the real job as change orders. You also have to respect existing conditions. In older homes around Studio City, Sherman Oaks, and Silver Lake, there is a good chance the project will uncover code issues once walls are open. A professional contractor will explain that risk before work begins and show you how it is being handled, not surprise you with it as if it came out of nowhere. Good preconstruction, realistic allowances, tight scheduling, and disciplined change management are what protect the budget. Cheap estimates and incomplete planning are usually what break it.",
        },
        {
          question: "What is a contingency budget and how much should I set aside",
          answer:
            "A contingency budget is money you set aside for the conditions you cannot fully see before construction starts. On paper, every remodel looks cleaner than it does once demo begins. In Los Angeles, especially in older homes, contingency covers the kinds of discoveries that regularly appear after walls and floors are opened: outdated wiring, hidden plumbing issues, framing corrections, moisture damage, subfloor problems, or city-required code upgrades. The right amount depends on the project. For a straightforward cosmetic renovation, the contingency can be smaller. For a full gut remodel, addition, or work on a house from the 1940s through 1970s in neighborhoods like Burbank, Sherman Oaks, or Studio City, you should plan more room. Many homeowners use ten to fifteen percent as a working rule, but the exact number should reflect the age of the structure and the complexity of the scope. Contingency is not extra money for impulse upgrades. It is what keeps the job stable when real construction conditions show up.",
        },
      ],
    },
    {
      categoryTitle: "Working with Red Stag",
      questions: [
        {
          question: "How does Red Stags design-build process work",
          answer:
            "Red Stag runs projects through a design-build structure, which means the planning side and the construction side work together under one roof instead of handing the job off between disconnected parties. In practical terms, that starts with a site visit and scope discussion, then moves into feasibility, design coordination, engineering where needed, budgeting, permitting, and construction. In Los Angeles, that integration matters because permit strategy, neighborhood constraints, and buildability should shape the plans from the beginning. If you are working on a hillside lot in Bel Air, an ADU in Sherman Oaks, or a remodel in an HOA-controlled neighborhood, the design cannot be separated from the realities of approval and construction logistics. A design-build process keeps those issues visible early. It also gives the homeowner one team responsible for the outcome instead of separate parties blaming one another when drawings, pricing, and construction do not align. That saves time, reduces friction, and produces a more controlled project.",
        },
        {
          question: "What areas does Red Stag Construction serve",
          answer:
            "Red Stag serves Greater Los Angeles and the San Fernando Valley, with active work spanning cities and neighborhoods such as Beverly Hills, Bel Air, Brentwood, Pacific Palisades, Malibu, Manhattan Beach, Santa Monica, Studio City, Sherman Oaks, Encino, Calabasas, Hidden Hills, Tarzana, Woodland Hills, West Hollywood, Silver Lake, Burbank, Granada Hills, Northridge, and San Fernando. Those are not interchangeable markets. A contractor working in Malibu deals with different approval and site conditions than one working in Burbank or Studio City. Coastal issues, hillside engineering, HOA controls, lot access, and neighborhood finish expectations all change how jobs are planned and built. That is why area coverage should mean more than a service radius on a map. It should mean the contractor has real experience with the departments, neighborhoods, and construction conditions that define those places. When homeowners ask where Red Stag works, the better question is whether the team understands the specific market where your property sits. That is the level that actually matters.",
        },
        {
          question: "How do I get a free estimate from Red Stag",
          answer:
            "The cleanest way to start is to call the office or submit a request through the contact form with enough detail to frame the conversation properly. The more specific you are, the more useful the first discussion becomes. If the project is a kitchen remodel in Encino, a bathroom remodel in Brentwood, or an ADU in Studio City, say that clearly. Include the neighborhood, the rough scope, whether you already have plans, and whether the work involves additions, structural changes, or permits. A serious estimate process usually starts with a conversation and a site visit, not a random number sent over text. In Los Angeles, pricing depends heavily on access, existing conditions, and city requirements, so a contractor who gives a confident number without seeing the property is usually simplifying too much. A free estimate should help you understand probable budget range, timeline, design needs, and next steps. It should not feel like a canned sales script disconnected from the actual property.",
        },
        {
          question: "How long has Red Stag been in business",
          answer:
            "Red Stag has been operating in the Los Angeles market for fifteen years. That matters because longevity in this business is not just about having a long resume. It means the company has worked through permit cycles, market swings, subcontractor shortages, material delays, code changes, and the very different demands of neighborhoods from the Westside to the Valley. In Los Angeles, experience is only useful if it is local and current. A contractor who has spent years dealing with LADBS, HOA review in gated communities, hillside structural coordination, and luxury-finish expectations in areas like Beverly Hills and Bel Air brings a different level of judgment to the job than someone still learning the market. Time in business also matters when homeowners care about warranty support and long-term accountability. If a company has been here for years, answering the phone and completing projects in the same market, that usually tells you more than a flashy proposal ever will.",
        },
        {
          question: "What types of projects does Red Stag specialize in",
          answer:
            "Red Stag focuses on high-end residential construction across the Los Angeles market. That includes kitchen remodels, bathroom remodels, ADUs, custom homes, home additions, general contracting scopes, hardscape, fencing and gates, and window replacement tied to larger renovation goals. The common thread is not just the service list. It is the type of project: work that requires disciplined planning, code compliance, and execution that holds up in demanding neighborhoods. A kitchen remodel in Studio City, a custom home in Bel Air, and an ADU in Sherman Oaks are all different jobs, but they all require a contractor who can coordinate design intent, permits, trade sequencing, and finish quality at a serious level. Red Stag is not positioned as a handyman operation or a volume-driven low-bid shop. The specialization is design-build residential work where homeowners need a licensed contractor who understands Los Angeles conditions and can carry the job from concept through final inspection without losing control of schedule or quality.",
        },
      ],
    },
    {
      categoryTitle: "After Your Project",
      questions: [
        {
          question: "What warranty does Red Stag provide on completed work",
          answer:
            "Warranty terms should always be confirmed in the contract because the exact coverage can vary by scope, trade, and manufacturer, but the broader point is that completed work should not be treated as finished the second the last invoice clears. On a serious Los Angeles project, warranty support means there is a clear process for handling punch items, workmanship concerns, and product issues that show up after turnover. That matters because homes settle, materials acclimate, and systems get used differently once a family is back in the space full time. A responsible contractor distinguishes between manufacturer warranties on items like windows, appliances, or fixtures and workmanship coverage on the installation itself. Homeowners should ask those questions before construction starts, not after a problem shows up. In higher-value neighborhoods where expectations are exacting, warranty responsiveness is part of the service standard. A contractor should be explicit about what is covered, how issues are reported, and what the timeline looks like for evaluating and correcting legitimate post-completion concerns.",
        },
        {
          question: "How do I maintain my remodeled kitchen or bathroom",
          answer:
            "Maintenance starts with using the materials the way they were intended. Natural stone, engineered surfaces, tile, grout, wood finishes, plumbing fixtures, and glass all have different care requirements, and you should know them before the room goes into daily use. In Los Angeles, sunlight, dry conditions, and hard water can all affect how materials age. Hard water especially matters in bathrooms and kitchens because scale buildup can show up quickly on premium fixtures and glass if you do not stay ahead of it. Good maintenance means using the right cleaners, resealing surfaces on schedule where required, checking caulk and grout lines periodically, and addressing small leaks or movement before they become larger failures. It also means operating ventilation correctly. A beautifully remodeled bathroom in a neighborhood like Brentwood or Encino will still have moisture problems if the exhaust fan is never used. The contractor builds the room correctly, but long-term performance still depends on how the finished space is cared for after turnover.",
        },
        {
          question: "What should I do if I notice an issue after my project is complete",
          answer:
            "Document the issue clearly and contact the contractor right away instead of waiting to see if it gets worse. Take photos, note when you first noticed it, and describe exactly what is happening. A hairline paint crack, a sticking door, a loose piece of hardware, or water showing up where it should not are all very different issues, and the contractor needs usable information to respond quickly. In Los Angeles, seasonal movement, settlement, and material acclimation can create minor punch-list items after a remodel, but anything involving moisture, drainage, windows, roofing, or plumbing should be reported immediately. If the home is in a hillside area or a property with sensitive exterior conditions, fast communication matters even more because small symptoms can point to larger water-management problems. The right approach is not to panic, and it is not to ignore it either. Report it early, through the agreed process, so the issue can be evaluated while the facts are still clear and before collateral damage spreads.",
        },
        {
          question: "How do I leave a review for Red Stag Construction",
          answer:
            "The simplest way is to leave a review on the platform where you found the company or where you are most comfortable sharing detailed feedback, whether that is Google, Yelp, Houzz, or another relevant channel. The most helpful reviews are specific. Instead of saying the job was great, talk about what the company handled well: permit coordination, schedule communication, cleanliness, change management, finish quality, or how the team responded when the inevitable construction issue came up. That kind of detail matters to future homeowners trying to hire in markets like Los Angeles, where proposals can look polished even when execution is weak. If your project involved a kitchen in Sherman Oaks, an ADU in Studio City, or a custom build in Bel Air, saying that context out loud helps the next homeowner evaluate whether the contractor is a fit for the type of work they need. Reviews are most useful when they describe how the company actually performed, not just how friendly the first meeting felt.",
        },
        {
          question: "Can Red Stag help with future projects after my first build",
          answer:
            "Yes, and for many homeowners that is one of the biggest advantages of building a relationship with a contractor who knows the property already. Once a team has worked on your house, they understand the existing conditions, the hidden constraints, the permit history, and the design direction you prefer. That makes future work more efficient and usually more accurate to scope. In Los Angeles, that continuity matters because many homes are improved in phases. A homeowner might start with a kitchen remodel in year one, add windows and hardscape later, then move into an addition or ADU once the timing is right. In neighborhoods with HOA oversight or hillside conditions, prior knowledge of the lot and prior permit documents can save real time. Future work also benefits from lessons learned during the first project. A contractor who already understands the property does not have to start from zero. That usually leads to cleaner planning, faster mobilization, and fewer surprises the second time around.",
        },
      ],
    },
  ];

  return (
    <>
      <ParallaxHero 
        imageSrc="/images/hero-faq.jpg" 
        imageAlt="FAQ Red Stag Construction"
        h1Text="Frequently Asked Questions"
        h2Text="Everything you need to know about building in Los Angeles."
        ctaText="Have More Questions?"
        ctaHref="/contact"
        phoneNumber="(626) 652-2303"
      />
      <TrustBadge />
      
      <section className="py-24 bg-warm-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQAccordion categories={categories} />
        </div>
      </section>
    </>
  );
}
