import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import blogsData from '@/data/blogs.json';
import locationsData from '@/data/locations.json';
import matrixData from '@/data/matrix.json';
import servicesData from '@/data/services.json';
import { ContactForm } from '@/components/forms/ContactForm';
import { TrustBar } from '@/components/sections/TrustBar';
import { ParallaxHero } from '@/components/ui/ParallaxHero';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { TrustBadge } from '@/components/ui/TrustBadge';

const PHONE_NUMBER = '(626) 652-2303';
const PHONE_HREF = 'tel:6266522303';
const CONTACT_EMAIL = 'support@redstagcc.com';
const BASE_URL = 'https://redstagcc.com';

type ServiceEntry = (typeof servicesData)[number];
type MatrixEntry = (typeof matrixData)[number];

interface CostTier {
  typicalProjectSize: string;
  costRange: string;
  timeline: string;
  whatIsIncluded: string;
  keyVariables: string;
}

interface GallerySlide {
  beforeImage: string;
  afterImage: string;
  altText: string;
}

interface ServiceTemplateConfig {
  serviceName: string;
  shortServiceName: string;
  matrixService: string;
  heroImage: string;
  heroSubline: string;
  scopeDetails: string;
  clientProfiles: string;
  processDetails: string;
  riskDetails: string;
  occupancyGuidance: string;
  contingencyGuidance: string;
  finalHeadline: string;
  relatedServices: string[];
  gallery: GallerySlide[];
  costGuide: {
    basic: CostTier;
    mid: CostTier;
    premium: CostTier;
  };
}

const serviceCrumbMap: Record<string, { label: string; href: string }> = {
  'kitchen-remodel-los-angeles': { label: 'Kitchen Remodel', href: '/kitchen-remodel-los-angeles' },
  'bathroom-remodel-los-angeles': { label: 'Bathroom Remodel', href: '/bathroom-remodel-los-angeles' },
  'adu-contractor-los-angeles': { label: 'ADU Construction', href: '/adu-contractor-los-angeles' },
  'custom-home-builder-los-angeles': { label: 'Custom Home Build', href: '/custom-home-builder-los-angeles' },
  'home-addition-contractor-los-angeles': { label: 'Home Addition', href: '/home-addition-contractor-los-angeles' },
  'general-contractor-los-angeles': { label: 'General Contracting', href: '/general-contractor-los-angeles' },
  'hardscape-contractor-los-angeles': { label: 'Hardscaping', href: '/hardscape-contractor-los-angeles' },
  'fence-company-los-angeles': { label: 'Fencing and Gates', href: '/fence-company-los-angeles' },
  'window-replacement-los-angeles': { label: 'Window Replacement', href: '/window-replacement-los-angeles' },
};

const matrixServiceMap: Record<string, string> = {
  'Kitchen Remodel': 'kitchen-remodel-los-angeles',
  'Bathroom Remodel': 'bathroom-remodel-los-angeles',
  'ADU Contractor': 'adu-contractor-los-angeles',
  'Custom Home Builder': 'custom-home-builder-los-angeles',
  'Home Addition': 'home-addition-contractor-los-angeles',
  'General Contracting': 'general-contractor-los-angeles',
  'Hardscape & Concrete': 'hardscape-contractor-los-angeles',
  'Fence Company': 'fence-company-los-angeles',
  'Window Replacement': 'window-replacement-los-angeles',
};

const serviceTemplateConfig: Record<string, ServiceTemplateConfig> = {
  'kitchen-remodel-los-angeles': {
    serviceName: 'Kitchen Remodel',
    shortServiceName: 'kitchen remodel',
    matrixService: 'Kitchen Remodel',
    heroImage: '/images/services/kitchen.jpg',
    heroSubline: 'Design-build kitchens planned around Los Angeles permits, cabinet lead times, and real resale expectations.',
    scopeDetails:
      'On these projects we regularly open walls, add beams, relocate appliances, upgrade panels, reroute gas and water, add ventilation, and coordinate cabinets, stone, tile, lighting, and finish carpentry so the room works as a daily production space instead of just looking good in photos.',
    clientProfiles:
      'The right fit is a Beverly Hills owner upgrading an outdated entertaining kitchen before resale, a Bel Air family that wants to open the back of the house and connect kitchen, dining, and yard, a Malibu homeowner rebuilding with materials that hold up to salt air, a Studio City client trying to make a tight 1940s footprint function for modern cooking, or a Sherman Oaks family adding an island, pantry storage, and better circulation before the next school year starts.',
    processDetails:
      'We start with site measurements, utility mapping, layout studies, cabinet and appliance planning, structural engineering when walls move, and early slab and finish selections so long-lead items are not an afterthought halfway through the job.',
    riskDetails:
      'Bad kitchen jobs usually fail at cabinet field measurements, appliance rough-in, venting, electrical capacity, and sequencing. The low bid leaves out panel work, the cabinet order is wrong, the stone template happens before walls are straight, and suddenly the homeowner is paying for avoidable rework.',
    occupancyGuidance:
      'Most Los Angeles families can stay in the house during a kitchen remodel if the project is limited to one zone and we create a temporary kitchen, but full gut jobs with layout changes, panel work, and gas relocation are easier to manage if you plan for partial relocation during the heaviest demo and rough-in weeks.',
    contingencyGuidance:
      'On kitchens we usually recommend a contingency of 10 to 15 percent because older LA homes regularly hide noncompliant wiring, undersized drains, and framing conditions that only show up after demolition.',
    finalHeadline: 'Start planning your kitchen remodel with a Los Angeles builder who knows permits, production, and finish work.',
    relatedServices: ['bathroom-remodel-los-angeles', 'home-addition-contractor-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/studio-before.png', afterImage: '/images/projects/studio-after.jpg', altText: 'Studio City kitchen remodel before and after' },
      { beforeImage: '/images/projects/trousdale-before.jpg', afterImage: '/images/projects/trousdale-after.jpg', altText: 'Beverly Hills style kitchen renovation before and after' },
      { beforeImage: '/images/projects/silverlake-before.jpg', afterImage: '/images/projects/silverlake-after.png', altText: 'Los Angeles open kitchen remodel before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '120-180 sq ft',
        costRange: '$45K-$75K',
        timeline: '8-10 weeks',
        whatIsIncluded: 'Cabinet replacement, countertops, fixture updates, lighting, appliance reset, and finish work within a mostly existing layout.',
        keyVariables: 'Cabinet package, panel capacity, plumbing relocation, ventilation route, and permit triggers.',
      },
      mid: {
        typicalProjectSize: '180-260 sq ft',
        costRange: '$75K-$150K',
        timeline: '10-14 weeks',
        whatIsIncluded: 'Layout revisions, semi-custom or custom cabinets, new flooring, upgraded lighting, appliance packages, and coordinated finish selections.',
        keyVariables: 'Structural wall removal, beam work, slab lead times, appliance ventilation, and HOA review.',
      },
      premium: {
        typicalProjectSize: '260-400+ sq ft',
        costRange: '$150K-$400K+',
        timeline: '14-20 weeks',
        whatIsIncluded: 'Full gut design-build renovation with major layout changes, high-end cabinetry, premium stone, custom millwork, smart lighting, and luxury appliances.',
        keyVariables: 'Hillside access, imported finishes, custom fabrication, utility upgrades, and inspection sequencing.',
      },
    },
  },
  'bathroom-remodel-los-angeles': {
    serviceName: 'Bathroom Remodel',
    shortServiceName: 'bathroom remodel',
    matrixService: 'Bathroom Remodel',
    heroImage: '/images/services/bathroom.jpg',
    heroSubline: 'Bathrooms rebuilt with proper waterproofing, permit coordination, and finish quality that holds up in the Los Angeles market.',
    scopeDetails:
      'A serious bathroom remodel here often means full demolition, new drain lines, shower pans, waterproofing, ventilation upgrades, tile work, glass coordination, lighting, heated floors, and vanity fabrication, especially when homeowners are correcting a layout that never worked or repairing old work that leaked behind finished walls.',
    clientProfiles:
      'This is for the Beverly Hills owner who needs a primary suite that matches the value of the home, the Bel Air household fixing an oversized but poorly planned bath, the Malibu client choosing moisture-resistant finishes for a coastal property, the Studio City homeowner updating a dated hall bath in a 1940s house, and the Sherman Oaks family converting an awkward bath into a daily-use primary that finally has storage and real ventilation.',
    processDetails:
      'We begin with site review, fixture planning, waterproofing details, plumbing layout confirmation, tile and slab coordination, and a real conversation about lead times because custom glass, stone tops, and imported tile can decide the schedule before demo even begins.',
    riskDetails:
      'Bathroom failures show up as leaking pans, weak waterproofing, poor drainage slope, wrong valve placement, and finish damage caused by trades working out of sequence. When the contractor treats waterproofing like a line item instead of a system, the homeowner pays for it later.',
    occupancyGuidance:
      'If the house has another functioning bathroom, most families stay home during the work. If the remodel hits the only full bath, we usually recommend a temporary plan because demolition, drying time, inspections, and tile sequencing make day-to-day use unrealistic.',
    contingencyGuidance:
      'Bathrooms deserve a 10 to 15 percent contingency in Los Angeles because old cast iron, prior leak damage, improper venting, and out-of-plumb framing are common once walls and floors are opened.',
    finalHeadline: 'Plan your bathroom remodel with a Los Angeles contractor who builds for waterproofing, inspections, and long-term use.',
    relatedServices: ['kitchen-remodel-los-angeles', 'home-addition-contractor-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Los Angeles bathroom-style renovation before and after' },
      { beforeImage: '/images/projects/studio-before.png', afterImage: '/images/projects/studio-after.jpg', altText: 'Studio City interior remodel before and after' },
      { beforeImage: '/images/projects/silverlake-before.jpg', afterImage: '/images/projects/silverlake-after.png', altText: 'Bathroom finish transformation before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '40-70 sq ft',
        costRange: '$25K-$50K',
        timeline: '4-6 weeks',
        whatIsIncluded: 'Tub or shower replacement, vanity, tile, fixtures, lighting, and finish upgrades within the existing footprint.',
        keyVariables: 'Drain condition, waterproofing corrections, tile selection, and permit scope.',
      },
      mid: {
        typicalProjectSize: '70-120 sq ft',
        costRange: '$50K-$100K',
        timeline: '6-9 weeks',
        whatIsIncluded: 'Full gut remodel with plumbing revisions, custom vanity, upgraded tile package, frameless glass, and ventilation improvements.',
        keyVariables: 'Valve relocation, slab or mud work, glass lead times, and inspection schedule.',
      },
      premium: {
        typicalProjectSize: '120-200+ sq ft',
        costRange: '$100K-$250K+',
        timeline: '9-14 weeks',
        whatIsIncluded: 'Primary suite bath redesign with wet-room planning, steam shower prep, luxury stone, custom millwork, radiant heat, and detailed lighting.',
        keyVariables: 'Structural changes, imported finishes, specialty waterproofing, and hillside logistics.',
      },
    },
  },
  'adu-contractor-los-angeles': {
    serviceName: 'ADU Construction',
    shortServiceName: 'ADU construction',
    matrixService: 'ADU Contractor',
    heroImage: '/images/services/adu.jpg',
    heroSubline: 'Detached ADUs, garage conversions, and design-build planning handled around Los Angeles zoning, setbacks, and permit timelines.',
    scopeDetails:
      'ADU construction is part entitlement work and part production build. We study lot coverage, utility access, fire separation, parking conditions, sewer or septic issues, and the difference between what is technically allowed and what is actually buildable on your property before anyone spends money on drawings that cannot get approved.',
    clientProfiles:
      'The typical ADU client is a Beverly Hills family creating long-term space for staff or relatives, a Bel Air owner adding guest quarters on a complex lot, a Malibu homeowner replacing outdated accessory space with a legal unit, a Studio City family building for rental income near the Ventura corridor, or a Sherman Oaks owner turning rear yard square footage into a real one-bedroom that supports aging parents or monthly rent.',
    processDetails:
      'The process starts with feasibility, survey review, utility planning, preliminary layout, engineering, and permit documents. Detached units, attached units, and garage conversions each move through city review differently, so we front-load the decision making before pricing construction.',
    riskDetails:
      'The common ADU mistakes are false assumptions about setbacks, utility capacity, fire separation, and grading. A contractor says yes too fast, the plans get kicked back, and the homeowner loses months. The other failure is underpricing site work on a sloped or tight lot where access controls the whole job.',
    occupancyGuidance:
      'Homeowners almost always stay in the main house during ADU construction, but you need to expect periods of trenching, utility shutdowns, staging in the driveway, and tighter site access while foundations, framing, and service connections are under way.',
    contingencyGuidance:
      'For ADUs we usually recommend a 10 to 15 percent contingency on flat lots and closer to 15 percent on hillside or access-constrained sites because trenching, utility upgrades, and grading conditions can move quickly once we open the ground.',
    finalHeadline: 'Start your ADU construction project with a Los Angeles team that understands zoning, utilities, and the real build cost.',
    relatedServices: ['custom-home-builder-los-angeles', 'home-addition-contractor-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Los Angeles ADU construction before and after' },
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Hillside detached structure before and after' },
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Luxury accessory structure transformation before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '350-500 sq ft',
        costRange: '$150K-$200K',
        timeline: '5-7 months',
        whatIsIncluded: 'Compact garage conversion or small attached ADU with standard finishes and utility tie-ins.',
        keyVariables: 'Utility upgrades, fire separation, access, drainage, and city-specific review.',
      },
      mid: {
        typicalProjectSize: '500-850 sq ft',
        costRange: '$200K-$300K',
        timeline: '7-10 months',
        whatIsIncluded: 'Detached one-bedroom or large attached ADU with full kitchen, bath, HVAC, insulation, and permit closeout.',
        keyVariables: 'Foundation scope, trenching distance, retaining needs, and finish package.',
      },
      premium: {
        typicalProjectSize: '850-1,200 sq ft',
        costRange: '$300K-$500K+',
        timeline: '10-14 months',
        whatIsIncluded: 'High-end detached ADU with custom exterior detailing, premium interiors, complex site work, and advanced engineering.',
        keyVariables: 'Hillside work, custom glazing, utility relocation, coastal or HOA approvals, and specialty systems.',
      },
    },
  },
  'custom-home-builder-los-angeles': {
    serviceName: 'Custom Home Build',
    shortServiceName: 'custom home build',
    matrixService: 'Custom Home Builder',
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'Ground-up homes delivered through one design-build team that knows Los Angeles entitlement, engineering, and production realities.',
    scopeDetails:
      'A custom home in Los Angeles means entitlement strategy, soils and structural coordination, drainage, retaining, utility planning, framing, MEP systems, exterior envelope, millwork, finish carpentry, and a long run of inspections that have to be managed without letting quality slip once the project gets past the glamorous early drawings.',
    clientProfiles:
      'We see this work from Beverly Hills teardown buyers replacing aging stock with larger modern homes, Bel Air owners dealing with canyon access and retaining, Malibu clients navigating coastal and fire-zone requirements, Studio City families choosing to rebuild instead of over-improve a small house, and Sherman Oaks owners on bigger lots who want new construction without leaving the neighborhood they already know.',
    processDetails:
      'The job starts with feasibility, survey, soils, conceptual planning, budget alignment, and then moves into architecture, engineering, permitting, procurement, site prep, foundation, framing, systems, finishes, and final turnover. It is a long sequence and the quality of supervision matters at every stage.',
    riskDetails:
      'Custom homes fail when the design team and builder are disconnected, the site assumptions are wrong, or the schedule is built around hope instead of approvals. That is how owners get months of redesign, blown allowances, and crews waiting on information that should have been solved before the permit set was submitted.',
    occupancyGuidance:
      'A ground-up custom home is not a stay-in-place project. Most clients live elsewhere while we handle site prep, structure, inspections, and finish work, then move in after final signoff and punch completion.',
    contingencyGuidance:
      'Custom home budgets need a disciplined contingency and owner reserve because land conditions, retaining, utility upgrades, and finish decisions can shift materially once engineering and procurement are fully in motion.',
    finalHeadline: 'Talk through your custom home build with a Los Angeles contractor who can manage design, permitting, and field execution under one roof.',
    relatedServices: ['adu-contractor-los-angeles', 'home-addition-contractor-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Bel Air custom home transformation before and after' },
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Los Angeles ground-up home improvement before and after' },
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Hillside luxury build before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '2,000-3,200 sq ft',
        costRange: '$500K-$800K',
        timeline: '12-16 months',
        whatIsIncluded: 'Ground-up build with disciplined structural scope, straightforward site conditions, and a solid finish package.',
        keyVariables: 'Soils, retaining, foundation complexity, utility connections, and permit duration.',
      },
      mid: {
        typicalProjectSize: '3,200-5,000 sq ft',
        costRange: '$800K-$1.5M',
        timeline: '16-22 months',
        whatIsIncluded: 'Architect-driven custom home with upgraded envelope, integrated systems, premium finishes, and detailed site coordination.',
        keyVariables: 'Hillside engineering, custom glazing, exterior detailing, and owner-driven scope changes.',
      },
      premium: {
        typicalProjectSize: '5,000+ sq ft',
        costRange: '$1.5M+',
        timeline: '20-30 months',
        whatIsIncluded: 'Large-scale luxury residence with complex structural demands, high-end interiors, outdoor living integration, and extensive custom fabrication.',
        keyVariables: 'Access, coastal or fire-zone requirements, imported materials, specialty systems, and review-board conditions.',
      },
    },
  },
  'home-addition-contractor-los-angeles': {
    serviceName: 'Home Addition',
    shortServiceName: 'home addition',
    matrixService: 'Home Addition',
    heroImage: '/images/services/home.jpg',
    heroSubline: 'Room additions and second-story expansions built around Los Angeles zoning, structure, and permit timing.',
    scopeDetails:
      'A home addition is where homeowners try to gain square footage without paying the cost of moving. That means we have to understand setbacks, floor area ratio, roof lines, matching old structure to new structure, utility capacity, and how to build new space without turning the existing house into a patchwork of avoidable problems.',
    clientProfiles:
      'This service fits Beverly Hills owners adding family space without losing lot value, Bel Air clients working around canyon contours and retaining, Malibu homeowners making room for guests or staff, Studio City households enlarging 1940s and 1950s homes that were never sized for modern living, and Sherman Oaks families choosing an addition over a move because they want more bedrooms, a bigger kitchen, or a primary suite without leaving their block.',
    processDetails:
      'We begin with feasibility, survey review, structural assessment of the existing house, conceptual layouts, engineering, and permit drawings. Once approvals are in motion, we sequence foundation work, framing tie-ins, utilities, exterior enclosure, and interior transitions so the old and new parts of the house actually function together.',
    riskDetails:
      'Additions go sideways when contractors miss setback limits, underprice foundation tie-ins, ignore roof and drainage transitions, or fail to protect the occupied portion of the home. That is where budget surprises, leaks, and ugly interior junctions come from.',
    occupancyGuidance:
      'Many families stay home during a first-floor addition if we can isolate the work area, but second-story additions and major tie-ins are more disruptive. We tell clients early when partial relocation makes more sense than trying to live through major structural work.',
    contingencyGuidance:
      'We usually recommend a 10 to 15 percent contingency for additions because tying new work into older framing, utilities, and foundations in Los Angeles rarely happens without some hidden conditions.',
    finalHeadline: 'Plan your home addition with a Los Angeles contractor who knows how to tie new structure into old homes without shortcuts.',
    relatedServices: ['kitchen-remodel-los-angeles', 'bathroom-remodel-los-angeles', 'adu-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Los Angeles home addition before and after' },
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Hillside expansion before and after' },
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Luxury home expansion before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '250-450 sq ft',
        costRange: '$100K-$200K',
        timeline: '4-6 months',
        whatIsIncluded: 'Room addition with new foundation, framing, roofing, insulation, drywall, windows, and standard finishes.',
        keyVariables: 'Setbacks, utility extensions, roof tie-ins, and interior connection work.',
      },
      mid: {
        typicalProjectSize: '450-900 sq ft',
        costRange: '$200K-$400K',
        timeline: '6-9 months',
        whatIsIncluded: 'Primary suite, family room, or kitchen expansion with structural revisions and coordinated interior remodel tie-ins.',
        keyVariables: 'Beam design, drainage, panel upgrades, and finish integration with the existing house.',
      },
      premium: {
        typicalProjectSize: '900+ sq ft',
        costRange: '$400K+',
        timeline: '9-14 months',
        whatIsIncluded: 'Large-scale or second-story addition with significant engineering, exterior detailing, and full interior transitions.',
        keyVariables: 'Hillside structural work, retaining, access, custom windows, and extensive owner selections.',
      },
    },
  },
  'hardscape-contractor-los-angeles': {
    serviceName: 'Hardscaping',
    shortServiceName: 'hardscape and concrete work',
    matrixService: 'Hardscape & Concrete',
    heroImage: '/images/services/hardscape.jpg',
    heroSubline: 'Driveways, retaining walls, patios, and outdoor living areas built for Los Angeles drainage, grading, and finish standards.',
    scopeDetails:
      'Hardscape work in Los Angeles is not cosmetic if the site carries water wrong, slopes toward the house, or depends on retaining to hold grade. We look at drainage, base prep, reinforcement, retaining design, concrete placement, pavers, stone, stairs, railings, lighting, and the way the exterior ties back into the structure and usable outdoor living.',
    clientProfiles:
      'The right client might be a Beverly Hills owner replacing a failing driveway and front approach, a Bel Air household dealing with retaining and slope pressure, a Malibu homeowner rebuilding outdoor areas with drainage and fire-zone requirements in mind, a Studio City family trying to make a flat back yard usable for entertaining, or a Sherman Oaks owner modernizing a dated pool deck and patio system.',
    processDetails:
      'The process begins with grading review, drainage planning, utility checks, retaining requirements, material selections, and layout. Then we move into demolition, excavation, base prep, formwork, steel, inspections when required, placement, finish work, and cure time before the surface is really ready to use.',
    riskDetails:
      'Bad hardscape jobs crack because the base is wrong, water is trapped, reinforcement is light, or slopes are guessed instead of calculated. Retaining walls fail because they are treated like landscaping instead of structural work. Those are expensive mistakes and they usually start with a bid that looked cheap.',
    occupancyGuidance:
      'Most clients stay in the house during hardscape work, but expect driveway outages, staging in the yard, dust, noise, and short periods where access paths are rerouted while concrete cures or excavation is under way.',
    contingencyGuidance:
      'We usually carry a 10 to 15 percent contingency on major hardscape jobs because drainage corrections, hidden utility conflicts, and subgrade conditions often show up after demolition and excavation.',
    finalHeadline: 'Start your hardscaping project with a Los Angeles contractor who understands drainage, retaining, and durable exterior construction.',
    relatedServices: ['fence-company-los-angeles', 'general-contractor-los-angeles', 'home-addition-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Los Angeles hardscape project before and after' },
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Retaining and exterior transformation before and after' },
      { beforeImage: '/images/projects/silverlake-before.jpg', afterImage: '/images/projects/silverlake-after.png', altText: 'Outdoor living renovation before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '300-600 sq ft',
        costRange: '$15K-$40K',
        timeline: '2-4 weeks',
        whatIsIncluded: 'Small patio, walkway, driveway section, or concrete flatwork replacement with straightforward prep.',
        keyVariables: 'Subgrade condition, demolition, finish type, drainage correction, and access.',
      },
      mid: {
        typicalProjectSize: '600-1,500 sq ft',
        costRange: '$40K-$100K',
        timeline: '4-8 weeks',
        whatIsIncluded: 'Patio, driveway, stairs, pavers, drainage improvements, or modest retaining integrated into one exterior package.',
        keyVariables: 'Excavation depth, wall engineering, lighting, drainage infrastructure, and surface material.',
      },
      premium: {
        typicalProjectSize: '1,500+ sq ft',
        costRange: '$100K+',
        timeline: '8-16 weeks',
        whatIsIncluded: 'Large-scale outdoor living build with retaining walls, custom concrete, premium stone, kitchens, fire features, and detailed site work.',
        keyVariables: 'Hillside work, access, structural retaining, specialty finishes, and drainage complexity.',
      },
    },
  },
  'fence-company-los-angeles': {
    serviceName: 'Fencing and Gates',
    shortServiceName: 'fencing and gate work',
    matrixService: 'Fence Company',
    heroImage: '/images/services/fence.jpg',
    heroSubline: 'Fences and gates installed with the right Los Angeles height limits, frontage rules, access controls, and finish standards.',
    scopeDetails:
      'Fence and gate work in Los Angeles affects privacy, security, curb appeal, and in many neighborhoods resale value. We look at property lines, front yard restrictions, allowable heights, automation needs, footing depth, wind exposure, slope transitions, and how the fence actually performs over time instead of just how it looks the day it is installed.',
    clientProfiles:
      'This service works for Beverly Hills owners tightening privacy without hurting curb appeal, Bel Air households coordinating gates and access on long drives, Malibu clients choosing materials that can hold up to coastal conditions, Studio City homeowners replacing tired perimeter fencing around family yards, and Sherman Oaks owners adding motorized driveway gates for security and daily convenience.',
    processDetails:
      'We begin with field measurements, line verification, gate hardware planning, code checks on height and frontage, and a conversation about wood, metal, composite, or mixed-material systems. From there we move through demolition, post or footing installation, framing, cladding, gate hardware, automation, and final testing.',
    riskDetails:
      'Fence jobs go wrong when property lines are assumed, posts are undersized, slopes are handled poorly, or automation is installed without clean electrical rough-in and proper clearance. The result is a fence that leans, a gate that binds, or a front yard installation that should never have been built that way.',
    occupancyGuidance:
      'Homeowners stay on site during fence and gate work, but you need to plan for temporary access changes, staged demolition, and short periods where pets, children, and vehicles need a different route in and out of the property.',
    contingencyGuidance:
      'We usually recommend a smaller but still real contingency on fence work because hidden old footings, difficult soil, line corrections, and gate power requirements can change scope after demolition starts.',
    finalHeadline: 'Plan your fencing and gates project with a Los Angeles contractor who builds for privacy, code, and daily use.',
    relatedServices: ['hardscape-contractor-los-angeles', 'window-replacement-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Los Angeles fencing and gates project before and after' },
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Gate and perimeter upgrade before and after' },
      { beforeImage: '/images/projects/hillside-before.png', afterImage: '/images/projects/hillside-after.jpg', altText: 'Hillside property boundary upgrade before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '80-150 linear ft',
        costRange: '$8K-$20K',
        timeline: '1-2 weeks',
        whatIsIncluded: 'Standard wood or metal fence replacement with straightforward access and limited grade change.',
        keyVariables: 'Material choice, footing depth, terrain, haul-off, and frontage restrictions.',
      },
      mid: {
        typicalProjectSize: '150-300 linear ft',
        costRange: '$20K-$50K',
        timeline: '2-4 weeks',
        whatIsIncluded: 'Larger perimeter fence with upgraded materials, pedestrian gate, and moderate slope or line complexity.',
        keyVariables: 'Custom fabrication, site slope, decorative details, and electrical rough-in.',
      },
      premium: {
        typicalProjectSize: '300+ linear ft',
        costRange: '$50K+',
        timeline: '4-8 weeks',
        whatIsIncluded: 'Custom privacy fence and automated gate package with premium materials, controls, and integrated site improvements.',
        keyVariables: 'Motorized gate systems, access control, grade transitions, structural posts, and finish detailing.',
      },
    },
  },
  'window-replacement-los-angeles': {
    serviceName: 'Window Replacement',
    shortServiceName: 'window replacement',
    matrixService: 'Window Replacement',
    heroImage: '/images/services/window.jpg',
    heroSubline: 'Window replacement planned around Title 24, weather protection, stucco repair, and the realities of older Los Angeles homes.',
    scopeDetails:
      'Window replacement is more than ordering glass and popping units into an opening. In Los Angeles we check Title 24 energy requirements, water management, flashing, stucco tie-in, trim conditions, frame rot, noise goals, and whether the homeowner wants insert replacements or full-frame work that actually fixes the opening correctly.',
    clientProfiles:
      'The right homeowner could be in Beverly Hills upgrading to quieter high-performance glazing, in Bel Air replacing weathered openings on a canyon-facing house, in Malibu choosing corrosion-resistant packages, in Studio City reducing heat gain and street noise in an older ranch, or in Sherman Oaks replacing original single-pane windows that never sealed well and now drive up cooling bills.',
    processDetails:
      'We start with field measurements, manufacturer coordination, opening review, product selection, Title 24 compliance checks, and a decision about insert versus full-frame installation. Then we schedule protection, removal, framing repairs when needed, flashing, installation, exterior patching, interior trim, and final adjustment.',
    riskDetails:
      'Bad window jobs usually show up as leaks, cracked stucco, poor air sealing, wrong sizes, and units that never operate correctly. Another common failure is using insert windows where the opening actually needs repair, which leaves the homeowner paying for a cosmetic upgrade that does not solve the real problem.',
    occupancyGuidance:
      'Most families stay home during window replacement because the work moves room by room, but you should expect dust, temporary exposure at openings, and a tight production schedule so the house can be secured again each day.',
    contingencyGuidance:
      'We recommend a modest contingency because older LA homes often hide rot, stucco damage, or framing repair around openings that only becomes visible after the existing units come out.',
    finalHeadline: 'Start your window replacement project with a Los Angeles contractor who handles the envelope correctly, not just the glass.',
    relatedServices: ['kitchen-remodel-los-angeles', 'bathroom-remodel-los-angeles', 'general-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/studio-before.png', afterImage: '/images/projects/studio-after.jpg', altText: 'Los Angeles window and exterior update before and after' },
      { beforeImage: '/images/projects/trousdale-before.jpg', afterImage: '/images/projects/trousdale-after.jpg', altText: 'Premium window replacement style project before and after' },
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Luxury opening upgrade before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: '8-12 openings',
        costRange: '$10K-$25K',
        timeline: '3-7 days',
        whatIsIncluded: 'Standard insert or straightforward replacement package with code-compliant glazing and basic finish repair.',
        keyVariables: 'Window type, opening condition, stucco patching, and manufacturer lead time.',
      },
      mid: {
        typicalProjectSize: '12-25 openings',
        costRange: '$25K-$60K',
        timeline: '1-3 weeks',
        whatIsIncluded: 'Mixed opening package with upgraded glass, better frame materials, trim work, and wider exterior repairs.',
        keyVariables: 'Full-frame versus insert install, opening repairs, and product performance requirements.',
      },
      premium: {
        typicalProjectSize: '25+ openings',
        costRange: '$60K+',
        timeline: '3-6 weeks',
        whatIsIncluded: 'High-performance or architectural window package with major opening repairs, premium hardware, and detailed finish integration.',
        keyVariables: 'Custom sizes, luxury product lines, coastal exposure, and extensive stucco or trim restoration.',
      },
    },
  },
  'general-contractor-los-angeles': {
    serviceName: 'General Contracting',
    shortServiceName: 'general contracting',
    matrixService: 'General Contracting',
    heroImage: '/images/services/general.jpg',
    heroSubline: 'One licensed Los Angeles contractor coordinating design, permits, trades, schedules, inspections, and delivery without handoffs.',
    scopeDetails:
      'General contracting in Los Angeles means owning the whole production system. We coordinate design, engineering, permits, procurement, field supervision, inspections, trade sequencing, budget control, and quality control across remodels, additions, ADUs, custom homes, exterior improvements, and specialty scopes that all need to come together on one schedule.',
    clientProfiles:
      'This service is for Beverly Hills owners who need one accountable builder on a high-expectation property, Bel Air households managing complex sites and consultant teams, Malibu clients balancing permitting and production risk, Studio City families trying to modernize older housing stock with one point of contact, and Sherman Oaks owners who want a contractor that actually runs the job instead of outsourcing every decision to whoever happens to be on site that week.',
    processDetails:
      'The process starts with scope definition, budget alignment, consultant coordination, permit strategy, and a real project schedule. Then we move into buyout, site logistics, production planning, inspections, owner communication, and finish delivery with one team tracking the whole job from start to closeout.',
    riskDetails:
      'When the wrong GC is in charge, the project suffers death by a thousand cuts: incomplete scope, weak supervision, missing permits, unreliable trades, no document control, and change orders that show up because no one solved the obvious issues before work started. Owners feel it in delay, cost, and quality.',
    occupancyGuidance:
      'Whether you stay home depends on the project type. Our job as the GC is to tell you early how disruptive the work will be, isolate occupied areas when that is realistic, and never pretend a heavy construction schedule can feel comfortable when it cannot.',
    contingencyGuidance:
      'Contingency on GC-led work depends on the scope, but we always build the budget around the real site conditions and approval path instead of trying to win the job with a number that falls apart after demolition or permit comments.',
    finalHeadline: 'Talk with a Los Angeles general contractor who can run the whole job with permits, supervision, and accountability from day one.',
    relatedServices: ['kitchen-remodel-los-angeles', 'custom-home-builder-los-angeles', 'adu-contractor-los-angeles'],
    gallery: [
      { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Los Angeles general contracting project before and after' },
      { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Large residential transformation before and after' },
      { beforeImage: '/images/projects/trousdale-before.jpg', afterImage: '/images/projects/trousdale-after.jpg', altText: 'High-end renovation management before and after' },
    ],
    costGuide: {
      basic: {
        typicalProjectSize: 'Scope dependent',
        costRange: 'Contact for Custom Quote',
        timeline: 'Scope dependent',
        whatIsIncluded: 'Permit coordination, trade sequencing, field supervision, budget tracking, and quality control for smaller residential scopes.',
        keyVariables: 'Project type, consultant team, city review path, and required trades.',
      },
      mid: {
        typicalProjectSize: 'Scope dependent',
        costRange: 'Contact for Custom Quote',
        timeline: 'Scope dependent',
        whatIsIncluded: 'Integrated management of remodel, addition, or ADU work with active permit, inspection, and owner communication oversight.',
        keyVariables: 'Structural scope, procurement timing, occupied conditions, and finish level.',
      },
      premium: {
        typicalProjectSize: 'Scope dependent',
        costRange: 'Contact for Custom Quote',
        timeline: 'Scope dependent',
        whatIsIncluded: 'Full-service design-build or large residential project management with consultant coordination and high-detail field execution.',
        keyVariables: 'Complexity, access, engineering demands, city or HOA review, and owner selections.',
      },
    },
  },
};

const getServiceCrumb = (slug: string) => serviceCrumbMap[slug] || { label: 'Service', href: `/${slug}` };

const getMatrixServiceCrumb = (serviceName: string) => {
  const matchedSlug = matrixServiceMap[serviceName];
  return matchedSlug ? getServiceCrumb(matchedSlug) : { label: serviceName, href: '/' };
};

const getServiceConfig = (service: ServiceEntry): ServiceTemplateConfig => {
  return (
    serviceTemplateConfig[service.slug] || {
      serviceName: getServiceCrumb(service.slug).label,
      shortServiceName: getServiceCrumb(service.slug).label.toLowerCase(),
      matrixService: getServiceCrumb(service.slug).label,
      heroImage: '/images/services/general.jpg',
      heroSubline: 'Licensed Los Angeles construction delivered through one accountable design-build team.',
      scopeDetails: service.intro,
      clientProfiles:
        'We work with homeowners across Beverly Hills, Bel Air, Malibu, Studio City, and Sherman Oaks who need a contractor that understands permits, sequencing, and what quality really costs in Los Angeles.',
      processDetails:
        'Every project starts with field review, budget alignment, permitting strategy, procurement planning, and a schedule tied to real inspection and delivery milestones.',
      riskDetails:
        'The wrong contractor usually leaves the owner with poor planning, weak supervision, and expensive change orders. We front-load the work so those failures are dealt with before the build starts.',
      occupancyGuidance:
        'Whether you can stay in the home depends on the scope, but we always explain the disruption level before construction begins.',
      contingencyGuidance:
        'We carry a contingency that reflects the actual age, condition, and approval path of the property instead of pretending Los Angeles projects behave like simple cosmetic jobs.',
      finalHeadline: 'Talk with Red Stag about your Los Angeles construction project before schedule and budget get away from you.',
      relatedServices: ['general-contractor-los-angeles'],
      gallery: [
        { beforeImage: '/images/projects/canyon-before.jpg', afterImage: '/images/projects/canyon-after.jpg', altText: 'Los Angeles construction project before and after' },
        { beforeImage: '/images/projects/belair-before.jpg', afterImage: '/images/projects/belair-after.jpg', altText: 'Los Angeles residential improvement before and after' },
        { beforeImage: '/images/projects/trousdale-before.jpg', afterImage: '/images/projects/trousdale-after.jpg', altText: 'High-end remodel before and after' },
      ],
      costGuide: {
        basic: {
          typicalProjectSize: 'Scope dependent',
          costRange: 'Contact for Custom Quote',
          timeline: 'Scope dependent',
          whatIsIncluded: 'Scope dependent',
          keyVariables: 'Scope dependent',
        },
        mid: {
          typicalProjectSize: 'Scope dependent',
          costRange: 'Contact for Custom Quote',
          timeline: 'Scope dependent',
          whatIsIncluded: 'Scope dependent',
          keyVariables: 'Scope dependent',
        },
        premium: {
          typicalProjectSize: 'Scope dependent',
          costRange: 'Contact for Custom Quote',
          timeline: 'Scope dependent',
          whatIsIncluded: 'Scope dependent',
          keyVariables: 'Scope dependent',
        },
      },
    }
  );
};

const buildServiceIntroduction = (service: ServiceEntry, config: ServiceTemplateConfig) => {
  return [
    `${config.serviceName} work in Los Angeles is never just about finishes or production speed. It starts with knowing what the property can actually support, what the city will approve, and what the existing house is hiding behind walls, ceilings, or old exterior assemblies. We look at LADBS permit triggers first, because even a project that sounds simple on the phone can turn into structural review, plan check comments, energy compliance, or correction work the moment you touch framing, utilities, drainage, or the building envelope. We also review HOA requirements when a property sits inside a managed community, because approval delays in Beverly Hills, Hidden Hills, or coastal neighborhoods can stall a perfectly good construction schedule if no one accounted for them early. Hillside lots change the conversation again. Soil reports, drainage paths, retaining pressure, and access restrictions can reshape the budget before any crew unloads tools. Historic preservation boards and design review bodies matter on older housing stock, especially where exterior changes, original details, or neighborhood character are protected. Setback requirements still matter even on projects people assume are interior only, because openings, additions, equipment placement, and exterior scope can push a job into a different approval path fast. ${config.scopeDetails} That is why Los Angeles homeowners need a contractor who understands both the field conditions and the permit desk.`,
    `Red Stag handles ${config.shortServiceName} differently because we do not split design, pricing, and production into disconnected handoffs. Our design-build process keeps planning, estimating, engineering coordination, and field execution under one contract, which means the same team that studies the site is also responsible for building the work correctly. That removes the usual gap between what the plans show and what the crew discovers on day one. We have been working in this market for 15 years, and that matters because Los Angeles is not forgiving to contractors who are learning while your house is open. We self-perform major parts of the work that most contractors push out without control, including framing, concrete, plumbing, and drywall, so schedule and quality do not depend on a revolving set of subs who were never aligned in the first place. That level of control matters on every job, but especially on ${config.shortServiceName} where sequencing decides whether the finish work goes in cleanly or gets damaged and redone. We run daily coordination around inspections, material deliveries, layout verification, and finish protection. When a problem shows up, it gets solved by the team that owns the contract, not bounced around between designer, project manager, and installer while the homeowner waits.`,
    `The homeowners who call us for ${config.shortServiceName} usually know the stakes. They are not looking for a generic crew. ${config.clientProfiles} What all of those owners have in common is that they are trying to make a real property decision, not just buy a prettier surface. In Los Angeles, the right construction scope can improve how a house lives every day, protect resale in a high-expectation neighborhood, or create space that keeps a family in place instead of forcing a move into a much higher mortgage. We spend time up front understanding how the owner uses the home, what part of the property is underperforming, what the surrounding neighborhood expects, and how much disruption is realistic for the family. That is why our recommendations are direct. If a plan makes sense, we say so. If the numbers only work with a different scope, we say that too. Homeowners in Beverly Hills, Bel Air, Malibu, Studio City, and Sherman Oaks do not need a sales pitch. They need a contractor who can tell them what the site, budget, and approval path actually support before they commit.`,
    `Our process starts with a consultation at the property so we can see existing conditions, talk through goals, and identify the approvals and technical decisions that will control price and timeline. After that we move into measurements, scope definition, preliminary budgeting, and the design-build planning needed to create real permit and construction documents. ${config.processDetails} If the work needs plan check or permit review through LADBS, we tell clients up front that residential approvals typically run 4 to 8 weeks, and longer if a project hits hillside review, design review, or extra correction cycles. That reality gets built into the schedule from the start. Once permits are moving, we finalize procurement and sequence the work around demolition, structural or utility rough-in, inspections, enclosure, finishes, punch, and final signoff. We do not wait until the middle of the job to talk about cabinet lead times, waterproofing inspections, or custom fabrication. Those are early decisions because they decide whether the job moves cleanly. Homeowners get straight updates about what is done, what is next, and what could affect schedule. It is a construction process, not a black box.`,
    `When homeowners choose the wrong contractor for ${config.shortServiceName}, the failure usually starts long before the first missed day on site. The number was too low because scope was incomplete. Permit requirements were ignored because someone wanted to move fast. The field team was not briefed, the subcontractors were not coordinated, and the owner was told every problem would be easy until the change orders started stacking up. ${config.riskDetails} Red Stag protects clients against those failure modes by doing the slow work first. We verify scope, document assumptions, align selections with the budget, coordinate drawings with what the field can actually build, and keep supervision tight once construction starts. We would rather tell a homeowner a hard truth at the estimate stage than sell a number that collapses the moment the house is opened up. That approach is why clients call us when they want a contractor who can pull permits, manage inspectors, control trades, and still deliver work that looks right at the end. In Los Angeles, that is not extra service. It is the baseline for doing the job responsibly.`,
  ];
};

const buildServiceFaqCategories = (config: ServiceTemplateConfig) => {
  const basicRange = config.costGuide.basic.costRange;
  const midRange = config.costGuide.mid.costRange;
  const premiumRange = config.costGuide.premium.costRange;

  return [
    {
      categoryTitle: 'Cost and Budget',
      questions: [
        {
          question: `What does ${config.shortServiceName} cost in Los Angeles?`,
          answer: `${config.serviceName} pricing in Los Angeles has to be framed honestly or the numbers are useless. For this service, a basic scope typically starts around ${basicRange}, mid-range work usually falls around ${midRange}, and premium projects move into ${premiumRange}. Those ranges reflect the real LA market, where labor runs above national averages, permit costs vary by city, and material lead times can affect production sequencing. The number changes based on structure, access, finish level, and how much of the existing work can actually stay. A job in Sherman Oaks with straightforward access and simple approvals will price differently than the same scope on a Malibu lot with tighter logistics or in Beverly Hills where review standards and finish expectations are higher. The right way to budget is to define scope first, then price the actual construction path instead of hoping a vague allowance will cover everything.`,
        },
        {
          question: `What pushes a ${config.shortServiceName} budget higher in Beverly Hills, Bel Air, or Malibu?`,
          answer: `The fastest way for a Los Angeles budget to move upward is when the site or approval path is more complex than the initial conversation suggested. Beverly Hills often brings higher review expectations, premium finish standards, and more detailed owner expectations. Bel Air can add canyon access, retaining concerns, delivery restrictions, and extra coordination on hillside parcels. Malibu introduces coastal exposure, fire-zone planning, long delivery routes, and in some cases additional agencies or utility complications. Even within LADBS jurisdictions, hillside conditions, older homes, prior unpermitted work, and utility upgrades can add real cost. That is why we do not treat square-foot pricing as a final answer. We study structure, access, drainage, utilities, and finish expectations first. Once those are clear, the budget becomes a planning tool. Until then, any contractor promising a clean fixed number is usually leaving out the very items that turn into change orders later.`,
        },
        {
          question: `How much contingency should I carry on a ${config.shortServiceName} project?`,
          answer: `${config.contingencyGuidance} In practical terms, contingency is there for the conditions you cannot fully confirm until demolition, trenching, opening walls, or getting deeper into permit comments. Los Angeles homes routinely reveal old wiring, out-of-level framing, hidden moisture damage, drain problems, poor prior work, and field conditions that do not match the age or finish level of the property. On hillside sites, grading and drainage can also shift the conversation quickly. The point of contingency is not to give a contractor room to drift. It is to protect the owner from losing decision-making power when a legitimate issue appears. We separate planned scope from contingency so clients can see what is priced, what is an allowance, and what is truly a reserve for unknowns. That is the difference between controlled budgeting and a project that becomes reactive the minute demolition starts.`,
        },
      ],
    },
    {
      categoryTitle: 'Process and Timeline',
      questions: [
        {
          question: `How long does ${config.shortServiceName} take from consultation to completion?`,
          answer: `The construction phase is only one part of the total timeline. First we need site review, scope alignment, design-build planning, pricing, and any engineering required to support the work. Then the permit path has to be accounted for. For many residential projects in Los Angeles, LADBS review runs 4 to 8 weeks, and that can stretch if there are corrections, hillside issues, HOA review, or city-specific comments outside the standard track. Once permits are in place and materials are ordered, production timing depends on the complexity of the work, site access, inspections, and owner selections. Simple scopes move faster. Projects with structural changes, custom fabrication, or difficult access take longer. The important thing is that the schedule should be built from actual milestones: approvals, procurement, rough-in, inspections, finishes, and punch. We would rather give a client a realistic timeline at the start than promise an aggressive date that fails the moment the first field condition changes.`,
        },
        {
          question: `When do permits apply to ${config.shortServiceName} work in Los Angeles?`,
          answer: `If the work changes structure, framing, openings, utilities, plumbing, electrical, mechanical systems, drainage, retaining, or the exterior of the building, you should assume permits are part of the conversation until a qualified contractor confirms otherwise. Los Angeles homeowners get into trouble when they assume a project is cosmetic even though it triggers code review the moment walls are opened or equipment is moved. LADBS is the main review path for many city properties, but independent cities and HOAs can add their own layers. We review that before construction starts because permit strategy affects price, sequencing, and lead time. A contractor willing to skip permits to lower the upfront number is not saving you money. They are moving risk onto the owner. We build the approval path into the plan from day one so inspections, closeout, and future resale are protected instead of treated like someone else is going to deal with them later.`,
        },
        {
          question: `Can I stay in my home while ${config.shortServiceName} is under way?`,
          answer: `${config.occupancyGuidance} The right answer depends on how much of the house is affected, whether utilities will be interrupted, and how safely we can isolate dust, noise, and access. In Los Angeles, many homeowners want to stay in place because temporary housing is expensive, but trying to force occupancy through a scope that does not support it can create stress for everyone. We talk about this directly before the contract is signed. If staying home is realistic, we build the site logistics around that goal. If it is not realistic, we say so early so the family can plan instead of scrambling halfway through the job. That kind of straight conversation saves far more trouble than pretending every project can feel comfortable while serious construction is happening inside or around the property.`,
        },
      ],
    },
    {
      categoryTitle: 'Choosing a Contractor',
      questions: [
        {
          question: `What should I verify before hiring a ${config.shortServiceName} contractor in Los Angeles?`,
          answer: `Start with license status, insurance, and who is actually going to supervise the work. Then look at whether the contractor understands local permitting, not just construction vocabulary. Ask who handles field measurements, who coordinates drawings, who orders long-lead items, who schedules inspections, and what work is self-performed versus pushed to subs. In Los Angeles, you also want to hear how the contractor deals with older homes, hillside conditions, HOA review, and city correction cycles, because those are normal parts of the job here. References matter, but only if they speak to the kind of project you are actually building. A contractor who does small cosmetic updates may not be equipped for structural or permit-heavy work. We encourage owners to ask hard questions because the answers reveal whether the builder has a real system or is just good at selling the first meeting.`,
        },
        {
          question: `Why does design-build matter on a ${config.shortServiceName} project?`,
          answer: `Design-build matters because Los Angeles projects lose time and money when design, estimating, and field execution are fragmented. If the architect draws one thing, the estimator prices another, and the site team discovers something different when demolition starts, the owner becomes the person carrying the gap. A design-build structure keeps planning, budget, engineering coordination, and construction aligned under one accountable team. That does not mean every decision gets easier. It means the same group that studies the property is responsible for solving the details in a way the field can actually build. On a permit-driven project, that alignment is a major advantage because scope, drawings, review comments, and construction sequencing stay connected. It is one of the main reasons Red Stag can give direct answers early instead of waiting until the house is open to explain what should have been identified before the contract was signed.`,
        },
        {
          question: `What are the warning signs that a bid for ${config.shortServiceName} is too low?`,
          answer: `A low number is a problem when it only works by leaving out scope that the site obviously needs. If the estimate is vague on permits, utilities, protection, demolition, inspections, finish coordination, or cleanup, the price is usually incomplete. The same warning applies when the schedule sounds unusually fast for Los Angeles approvals or when the contractor cannot explain what happens if hidden conditions show up. Cheap bids often depend on allowances that are unrealistically low, labor assumptions that do not match the market, or a plan to pass problems back to the homeowner as change orders. We see this constantly after clients collect three or four bids and one of them comes in far under the rest. The right question is not whether the cheapest bid is a good deal. It is whether that contractor has actually priced the project you need built. If not, the savings disappear the moment work begins.`,
        },
      ],
    },
  ];
};

const getServiceAreaLinks = (matrixService: string) => {
  return locationsData
    .map((location) => matrixData.find((entry) => entry.city === location.city && entry.service === matrixService))
    .filter((entry): entry is MatrixEntry => Boolean(entry));
};

const getRelatedServices = (serviceSlugs: string[]) => {
  return serviceSlugs
    .map((slug) => servicesData.find((service) => service.slug === slug))
    .filter((service): service is ServiceEntry => Boolean(service));
};

// 1. Static Paths for Build Time
export async function generateStaticParams() {
  const serviceParams = servicesData.map(s => ({ slug: s.slug }));
  const locationParams = locationsData.map(l => ({ slug: l.slug }));
  const matrixParams = matrixData.map(m => ({ slug: m.slug }));
  const blogParams = blogsData.map(b => ({ slug: b.slug }));
  return [...serviceParams, ...locationParams, ...matrixParams, ...blogParams];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 2. Dynamic Metadata Generation
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  const service = servicesData.find(s => s.slug === slug);
  if (service) return { 
    title: service.metaTitle || 'Construction Services | Red Stag', 
    description: service.metaDescription || 'Expert construction services in Los Angeles.',
    alternates: { canonical: `${BASE_URL}/${slug}` }
  };
  
  const location = locationsData.find(l => l.slug === slug);
  if (location) return {
    title: `General Contractor in ${location.city || 'Los Angeles'}, CA | Red Stag Construction`,
    description: `Licensed general contractor in ${location.city || 'Los Angeles'}, CA. Building custom homes, ADUs, and high-end remodels. Free design-build estimates.`,
    alternates: { canonical: `${BASE_URL}/${slug}` }
  };
  
  const matrix = matrixData.find(m => m.slug === slug);
  if (matrix) return {
    title: `${matrix.title || 'Construction Service'} | Red Stag Construction`,
    description: matrix.intro ? matrix.intro.substring(0, 155).trim() + '...' : 'Expert construction in Los Angeles.',
    alternates: { canonical: `${BASE_URL}/${slug}` }
  };
  const blog = blogsData.find(b => b.slug === slug);
  if (blog) return {
    title: blog.title || 'Construction Blog',
    description: `Read more about ${blog.keyword || 'building'} and expert construction insights.`,
    alternates: { canonical: `${BASE_URL}/${slug}` }
  };
  
  return { title: "Page Not Found" };
}

// 3. Main Page Component
export default async function DynamicSlugPage({ params }: PageProps) {
  const { slug } = await params;

  const service = servicesData.find(s => s.slug === slug);
  const location = locationsData.find(l => l.slug === slug);
  const matrix = matrixData.find(m => m.slug === slug);
  const blog = blogsData.find(b => b.slug === slug);

  if (!service && !location && !matrix && !blog) {
    notFound();
  }

  // --- BLOG PAGE TEMPLATE ---
  if (blog) {
    const filePath = path.join(process.cwd(), 'src', 'content', 'blog', `${blog.slug}.mdx`);
    let fileContent = '';
    try { fileContent = fs.readFileSync(filePath, 'utf8'); } catch (e) {}
    
    let contentBody = fileContent.replace(/---[\s\S]*?---/, '').trim();
    contentBody = contentBody.replace(/^#\s+(.*$)/gim, '<h1 class="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8">$1</h1>');
    contentBody = contentBody.replace(/^##\s+(.*$)/gim, '<h2 class="text-3xl font-serif font-bold text-text-dark mt-12 mb-6">$1</h2>');
    contentBody = contentBody.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    const parts = contentBody.split('\n\n');
    let htmlContent = parts.map(p => {
      if (p.trim() === '' || p.startsWith('<h') || p.startsWith('<script') || p.startsWith('</script') || p.includes('type="application/ld+json"') || p.startsWith('---')) return p;
      return `<p class="mb-6 leading-relaxed text-lg">${p}</p>`;
    }).join('\n');

    return (
      <div className="bg-white py-24 min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg max-w-none text-text-body" dangerouslySetInnerHTML={{ __html: htmlContent }} />
          
          <div className="border-t border-gray-200 pt-10 mt-16 pb-8">
            <h3 className="text-2xl font-serif font-bold text-text-dark mb-6">Explore Related Services</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={`/${blog.serviceSlug || ''}`} className="bg-warm-white text-text-dark border border-gray-200 px-8 py-4 rounded hover:bg-accent-red hover:text-white transition-colors font-bold text-center">Service: <span className="capitalize">{(blog.serviceSlug || '').replace(/-/g, ' ')}</span></Link>
              <Link href={`/${blog.locationSlug || ''}`} className="bg-accent-red text-white px-8 py-4 rounded shadow-md hover:opacity-90 transition-opacity font-bold text-center">Location: <span className="capitalize">{(blog.locationSlug || '').replace('general-contractor-', '').replace(/-/g, ' ')}</span></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SERVICE PAGE TEMPLATE ---
  if (service) {
    const config = getServiceConfig(service);
    const introParagraphs = buildServiceIntroduction(service, config);
    const faqCategories = buildServiceFaqCategories(config);
    const serviceAreaLinks = getServiceAreaLinks(config.matrixService);
    const relatedServices = getRelatedServices(config.relatedServices);
    const serviceCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/' },
      { label: getServiceCrumb(service.slug).label, href: `/${service.slug}` },
    ];

    return (
      <>
        <section className="border-b border-gray-200 bg-warm-white py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs crumbs={serviceCrumbs} />
          </div>
        </section>
        <ParallaxHero 
          imageSrc={config.heroImage}
          imageAlt={service.h1 || config.serviceName}
          h1Text={service.h1 || `${config.serviceName} in Los Angeles, CA`}
          h2Text={config.heroSubline}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber={PHONE_NUMBER}
        />
        <TrustBar />
        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">What goes into this work in Los Angeles</h2>
            </div>
            <div className="space-y-8 text-lg leading-8 text-text-body">
              {introParagraphs.map((paragraph, index) => (
                <p key={`${service.slug}-intro-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Ready to start your {config.shortServiceName} project in Los Angeles?
            </h2>
            <a href={PHONE_HREF} className="mt-6 block text-4xl font-bold text-white transition-opacity hover:opacity-90">
              {PHONE_NUMBER}
            </a>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
            >
              Get a Free Estimate
            </Link>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Los Angeles cost guide</h2>
            </div>
            <div className="overflow-x-auto border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-navy-deep text-left text-white">
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">Scope</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">Basic Scope</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">Mid-Range</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">Premium</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm md:text-base text-text-body">
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">Typical project size</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.basic.typicalProjectSize}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.mid.typicalProjectSize}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.premium.typicalProjectSize}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">Cost range</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.basic.costRange}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.mid.costRange}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.premium.costRange}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">Timeline</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.basic.timeline}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.mid.timeline}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.premium.timeline}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">What is included</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.basic.whatIsIncluded}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.mid.whatIsIncluded}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{config.costGuide.premium.whatIsIncluded}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark">Key variables</td>
                    <td className="px-5 py-4">{config.costGuide.basic.keyVariables}</td>
                    <td className="px-5 py-4">{config.costGuide.mid.keyVariables}</td>
                    <td className="px-5 py-4">{config.costGuide.premium.keyVariables}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-lg leading-8 text-text-body">
              In the Los Angeles market construction labor runs 40 to 60 percent above the national average. Permit fees vary by city - Beverly Hills and Santa Monica charge significantly more than LADBS. Hillside projects add 15 to 30 percent to foundation and structural costs. HOA design review can add 4 to 12 weeks to your timeline. These are real variables Red Stag accounts for in every estimate.
            </p>
          </div>
        </section>

        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Before and after</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {config.gallery.map((slide) => (
                <BeforeAfterSlider
                  key={`${service.slug}-${slide.beforeImage}-${slide.afterImage}`}
                  beforeImage={slide.beforeImage}
                  afterImage={slide.afterImage}
                  altText={slide.altText}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Questions homeowners ask before they hire</h2>
            </div>
            <FAQAccordion categories={faqCategories} />
          </div>
        </section>

        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Related services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((relatedService) => (
                <Link
                  key={relatedService.slug}
                  href={`/${relatedService.slug}`}
                  className="border border-gray-200 bg-white p-8 transition-colors hover:border-accent-red"
                >
                  <h3 className="text-2xl font-serif font-bold text-text-dark">{getServiceCrumb(relatedService.slug).label}</h3>
                  <p className="mt-4 text-base leading-7 text-text-body">
                    Explore how Red Stag approaches {getServiceCrumb(relatedService.slug).label.toLowerCase()} work in Los Angeles.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                We provide {config.shortServiceName} across Greater Los Angeles
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {serviceAreaLinks.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/${entry.slug}`}
                  className="border border-gray-200 bg-warm-white px-4 py-4 text-sm font-semibold text-text-dark transition-colors hover:border-accent-red hover:text-accent-red"
                >
                  {entry.city}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">{config.finalHeadline}</h2>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              Our schedule fills 6-8 weeks out. The sooner we talk the sooner we build.
            </p>
            <a href={PHONE_HREF} className="mt-8 block text-4xl font-bold text-white transition-opacity hover:opacity-90">
              {PHONE_NUMBER}
            </a>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
            >
              Get a Free Estimate
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 block text-base font-medium text-white/80 transition-opacity hover:opacity-90"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </>
    );
  }

  // --- LOCATION PAGE TEMPLATE ---
  if (location) {
    const locationCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Areas We Serve', href: '/areas-we-serve' },
      { label: location.city || 'Los Angeles', href: `/${location.slug}` },
    ];

    return (
      <>
        <section className="border-b border-gray-200 bg-warm-white py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs crumbs={locationCrumbs} />
          </div>
        </section>
        <ParallaxHero 
          imageSrc={`/images/locations/city-overview.jpg`} // Fallback image logic
          imageAlt={`General Contractor ${location.city || 'Los Angeles'}`}
          h1Text={`General Contractor in ${location.city || 'Los Angeles'}, CA`}
          h2Text={`Luxury remodels, ADUs, and Custom Homes in ${location.city || 'Los Angeles'}.`}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber="(626) 652-2303"
        />
        <TrustBadge />
        <section className="bg-white py-24">
          <div className="container mx-auto px-4 max-w-4xl">
             <h2 className="text-3xl font-serif font-bold text-text-dark mb-8">Building in {location.city || 'Los Angeles'}</h2>
             <p className="text-lg text-text-body leading-relaxed mb-12">
               {location.intro || ''}
             </p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center pt-8 border-t border-gray-200">
                <Button href={`/kitchen-remodel-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Kitchen Remodeling in {location.city || 'Los Angeles'}</Button>
                <Button href={`/bathroom-remodel-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Bathroom Remodeling in {location.city || 'Los Angeles'}</Button>
                <Button href={`/adu-contractor-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">ADU Contractor in {location.city || 'Los Angeles'}</Button>
                <Button href={`/custom-home-builder-${(location.slug || '').replace('general-contractor-', '')}`} variant="outline">Custom Homes in {location.city || 'Los Angeles'}</Button>
             </div>
          </div>
        </section>
        
        <section className="bg-navy-deep py-24 border-t border-gray-800">
           <div className="container mx-auto px-4 max-w-4xl text-center">
             <h2 className="text-4xl font-serif font-bold text-white mb-6">Start Your {location.city || 'Los Angeles'} Project</h2>
             <div className="bg-white p-8 md:p-12 text-left rounded-sm shadow-xl mt-12">
               <ContactForm />
             </div>
           </div>
        </section>
      </>
    );
  }

  // --- MATRIX PAGE TEMPLATE ---
  if (matrix) {
    const matrixService = getMatrixServiceCrumb(matrix.service || 'Service');
    const matrixCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/' },
      { label: matrixService.label, href: matrixService.href },
      { label: matrix.city || 'Los Angeles', href: `/${matrix.slug}` },
    ];

    return (
      <>
        <section className="border-b border-gray-200 bg-warm-white py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs crumbs={matrixCrumbs} />
          </div>
        </section>
        <ParallaxHero 
          imageSrc={`/images/services/${(matrix.service || 'general').toLowerCase().split(' ')[0]}.jpg`} // Fallback
          imageAlt={`${matrix.service || 'Service'} in ${matrix.city || 'Los Angeles'}`}
          h1Text={matrix.title || 'Construction Services'}
          h2Text={`${matrix.city || 'Los Angeles'}, CA`}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber="(626) 652-2303"
        />
        <TrustBadge />
        <section className="bg-warm-white py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <span className="w-12 h-1 bg-accent-red"></span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-dark">Serving {matrix.city || 'Los Angeles'} and Surrounding Areas</h2>
            </div>
            <p className="text-lg text-text-body leading-relaxed">
              {matrix.intro || ''}
            </p>
          </div>
        </section>
        <section className="bg-white py-24 border-t border-gray-200">
           <div className="container mx-auto px-4 max-w-4xl text-center">
             <h2 className="text-4xl font-serif font-bold text-text-dark mb-6">Expert {matrix.service || 'Construction'} Installation</h2>
             <p className="text-xl text-text-body mb-12">Red Stag Construction handles all permits and engineering requirements natively. Contact us today.</p>
             <div className="bg-gray-50 p-8 md:p-12 text-left border border-gray-200">
               <ContactForm />
             </div>
           </div>
        </section>
      </>
    );
  }
}
