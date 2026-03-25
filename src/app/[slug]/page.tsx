import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import blogsData from '@/data/blogs.json';
import locationsData from '@/data/locations.json';
import matrixData from '@/data/matrix.json';
import reviewsData from '@/data/reviews.json';
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
type LocationEntry = (typeof locationsData)[number];
type MatrixEntry = (typeof matrixData)[number];
type ReviewEntry = (typeof reviewsData)[number];

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

interface TierPricing {
  title: string;
  summary: string;
  kitchen: string;
  bathroom: string;
  adu: string;
  customHome: string;
}

interface LocationTemplateConfig {
  tier: 1 | 2 | 3 | 4 | 5;
  heroImage: string;
  heroSubline: string;
  serviceLinkSlug: string;
  serviceLinkLabel: string;
  introStart: string;
  introEnd: string;
  marketContext: string;
  processContext: string;
  redStagContext: string;
  permitFocus: string;
  siteFocus: string;
  prepFocus: string;
  projectFocus: string;
  logisticsFocus: string;
  differentiatorFocus: string;
  relatedCities: string[];
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

const secondaryLocationServiceSlugMap: Record<string, string> = {
  'Beverly Hills': '/kitchen-remodel-los-angeles',
  'Bel Air': '/home-addition-contractor-los-angeles',
  Brentwood: '/home-addition-contractor-los-angeles',
  Malibu: '/hardscape-contractor-los-angeles',
  'Pacific Palisades': '/home-addition-contractor-los-angeles',
  'Manhattan Beach': '/window-replacement-los-angeles',
  'Santa Monica': '/adu-contractor-los-angeles',
  'Studio City': '/adu-contractor-los-angeles',
  'Sherman Oaks': '/home-addition-contractor-los-angeles',
  Encino: '/home-addition-contractor-los-angeles',
  Calabasas: '/home-addition-contractor-los-angeles',
  'Hidden Hills': '/hardscape-contractor-los-angeles',
  'West Hollywood': '/bathroom-remodel-los-angeles',
  'Silver Lake': '/kitchen-remodel-los-angeles',
  Burbank: '/adu-contractor-los-angeles',
  'Granada Hills': '/adu-contractor-los-angeles',
  Northridge: '/home-addition-contractor-los-angeles',
  'San Fernando': '/kitchen-remodel-los-angeles',
  Tarzana: '/adu-contractor-los-angeles',
  'Woodland Hills': '/home-addition-contractor-los-angeles',
};

const blogTopicServiceMatchers = [
  { slug: 'kitchen-remodel-los-angeles', patterns: ['kitchen', 'cabinet', 'island'] },
  { slug: 'bathroom-remodel-los-angeles', patterns: ['bathroom', 'bath ', 'shower', 'tub', 'tile'] },
  { slug: 'adu-contractor-los-angeles', patterns: ['adu', 'garage conversion', 'setback'] },
  { slug: 'custom-home-builder-los-angeles', patterns: ['custom home', 'architect', 'draftsman'] },
  { slug: 'home-addition-contractor-los-angeles', patterns: ['addition', 'second story', 'room add'] },
  { slug: 'hardscape-contractor-los-angeles', patterns: ['hardscape', 'retaining wall', 'waterproofing', 'deck', 'outdoor kitchen', 'drought'] },
  { slug: 'fence-company-los-angeles', patterns: ['fenc', 'gate', 'privacy', 'security'] },
  { slug: 'window-replacement-los-angeles', patterns: ['window', 'title 24', 'energy efficient'] },
  { slug: 'general-contractor-los-angeles', patterns: ['general contractor', 'design-build', 'permit process', 'ladbs', 'hillside construction'] },
] as const;

const relatedBlogServiceFallbacks: Record<string, string[]> = {
  'kitchen-remodel-los-angeles': ['home-addition-contractor-los-angeles', 'general-contractor-los-angeles', 'bathroom-remodel-los-angeles'],
  'bathroom-remodel-los-angeles': ['kitchen-remodel-los-angeles', 'general-contractor-los-angeles', 'home-addition-contractor-los-angeles'],
  'adu-contractor-los-angeles': ['home-addition-contractor-los-angeles', 'general-contractor-los-angeles', 'custom-home-builder-los-angeles'],
  'custom-home-builder-los-angeles': ['general-contractor-los-angeles', 'home-addition-contractor-los-angeles', 'hardscape-contractor-los-angeles'],
  'home-addition-contractor-los-angeles': ['kitchen-remodel-los-angeles', 'general-contractor-los-angeles', 'adu-contractor-los-angeles'],
  'hardscape-contractor-los-angeles': ['general-contractor-los-angeles', 'custom-home-builder-los-angeles', 'window-replacement-los-angeles'],
  'fence-company-los-angeles': ['general-contractor-los-angeles', 'hardscape-contractor-los-angeles', 'window-replacement-los-angeles'],
  'window-replacement-los-angeles': ['general-contractor-los-angeles', 'kitchen-remodel-los-angeles', 'custom-home-builder-los-angeles'],
  'general-contractor-los-angeles': ['kitchen-remodel-los-angeles', 'adu-contractor-los-angeles', 'home-addition-contractor-los-angeles'],
};

const getSecondaryLocationServiceLink = (city: string) => {
  const href = secondaryLocationServiceSlugMap[city] || '/home-addition-contractor-los-angeles';
  return {
    href,
    label: getServiceCrumb(href.replace(/^\//, '')).label.toLowerCase(),
  };
};

const getBlogServiceLinks = (sourceText: string) => {
  const normalized = sourceText.toLowerCase();
  const matchedSlugs = blogTopicServiceMatchers
    .filter(({ patterns }) => patterns.some((pattern) => normalized.includes(pattern)))
    .map(({ slug }) => slug);
  const uniqueSlugs = Array.from(new Set(matchedSlugs));
  const primarySlug = uniqueSlugs[0] || 'general-contractor-los-angeles';
  const fallbackSlugs = relatedBlogServiceFallbacks[primarySlug] || relatedBlogServiceFallbacks['general-contractor-los-angeles'];
  const finalSlugs = Array.from(new Set([primarySlug, ...uniqueSlugs.slice(1), ...fallbackSlugs])).slice(0, 3);

  return finalSlugs.map((slug) => {
    const crumb = getServiceCrumb(slug);
    return { slug, href: crumb.href, label: crumb.label };
  });
};

const buildBlogInternalLinkParagraphs = (serviceLinks: { href: string; label: string }[]) => {
  const [primary, secondary, tertiary] = serviceLinks;
  const paragraphs = [];

  if (primary) {
    paragraphs.push(
      `<p class="mb-6 leading-relaxed text-lg">If this topic is part of a live project, start with our <a href="${primary.href}" class="font-semibold text-[#CC0000] underline underline-offset-4">${primary.label}</a> page. It lays out the Los Angeles permit path, cost ranges, and production issues that usually decide whether a plan is realistic before drawings and ordering begin.</p>`
    );
  }

  if (secondary) {
    paragraphs.push(
      `<p class="mb-6 leading-relaxed text-lg">A lot of homeowners comparing scope also review our <a href="${secondary.href}" class="font-semibold text-[#CC0000] underline underline-offset-4">${secondary.label}</a> work, because utility upgrades, inspection sequencing, and finish coordination often overlap once a remodel starts moving beyond surface-level changes.</p>`
    );
  }

  if (tertiary) {
    paragraphs.push(
      `<p class="mb-6 leading-relaxed text-lg">If the project may expand, our <a href="${tertiary.href}" class="font-semibold text-[#CC0000] underline underline-offset-4">${tertiary.label}</a> page shows how Red Stag plans larger Los Angeles scopes around approvals, structural review, procurement, and occupied-home scheduling instead of treating them like a quick cosmetic update.</p>`
    );
  }

  return paragraphs;
};

interface BlogFaqItem {
  question: string;
  answer: string;
}

interface BlogSubSection {
  title: string;
  paragraphs: string[];
}

interface BlogSection {
  id: string;
  title: string;
  paragraphs: string[];
  subSections?: BlogSubSection[];
}

const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const countWords = (value: string) => {
  const normalized = value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return normalized ? normalized.split(' ').length : 0;
};

const locationSignals = [
  'los angeles',
  'beverly hills',
  'bel air',
  'studio city',
  'sherman oaks',
  'encino',
  'malibu',
  'pacific palisades',
  'calabasas',
  'santa monica',
  'west hollywood',
  'manhattan beach',
  'silver lake',
  'burbank',
  'tarzana',
  'woodland hills',
  'granada hills',
  'northridge',
  'san fernando',
  'brentwood',
];

const hasLocationSignal = (value: string) =>
  locationSignals.some((signal) => value.toLowerCase().includes(signal));

const buildBlogMetaTitle = (title: string) => {
  const suffix = ' in Los Angeles';

  if (hasLocationSignal(title)) {
    return title.length <= 60 ? title : `${title.slice(0, 57).trimEnd()}...`;
  }

  const maxBaseLength = 60 - suffix.length;
  const base = title.length > maxBaseLength ? title.slice(0, maxBaseLength).trimEnd() : title;
  return `${base}${suffix}`;
};

const buildBlogMetaDescription = (keywordOrTitle: string) => {
  const fallbackSentence =
    'Red Stag Construction serves Greater Los Angeles including Beverly Hills Bel Air Studio City and Sherman Oaks.';
  const baseDescription = `Read more about ${keywordOrTitle} and expert construction insights.`;

  if (hasLocationSignal(baseDescription)) {
    return baseDescription.length <= 160 ? baseDescription : `${baseDescription.slice(0, 157).trimEnd()}...`;
  }

  const maxBaseLength = 160 - 1 - fallbackSentence.length;
  const trimmedBase =
    baseDescription.length > maxBaseLength ? baseDescription.slice(0, maxBaseLength).trimEnd() : baseDescription;

  return `${trimmedBase} ${fallbackSentence}`;
};

const normalizeReviewServiceType = (value?: string | null) => {
  const normalized = (value || '').toLowerCase().trim();

  if (normalized.includes('kitchen')) return 'Kitchen Remodel';
  if (normalized.includes('bathroom')) return 'Bathroom Remodel';
  if (normalized.includes('adu')) return 'ADU Construction';
  if (normalized.includes('custom home')) return 'Custom Home Build';
  if (normalized.includes('addition')) return 'Home Addition';
  if (normalized.includes('general')) return 'General Contracting';
  if (normalized.includes('hardscape')) return 'Hardscaping';
  if (normalized.includes('fence')) return 'Fencing and Gates';
  if (normalized.includes('window')) return 'Window Replacement';

  return value || '';
};

const getRelevantReview = (city?: string | null, serviceType?: string | null): ReviewEntry => {
  const normalizedServiceType = normalizeReviewServiceType(serviceType);

  return (
    reviewsData.find(
      (review) =>
        Boolean(city) &&
        Boolean(normalizedServiceType) &&
        review.city === city &&
        review.serviceType === normalizedServiceType
    ) ||
    reviewsData.find((review) => Boolean(city) && review.city === city) ||
    reviewsData.find((review) => Boolean(normalizedServiceType) && review.serviceType === normalizedServiceType) ||
    reviewsData[0]
  );
};

const ReviewFeatureCard = ({ review }: { review: ReviewEntry }) => (
  <section className="bg-white py-20 md:py-24">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="bg-navy-deep px-8 py-10 md:px-10 md:py-12 shadow-xl">
        <span className="block text-6xl leading-none text-accent-red">&ldquo;</span>
        <p className="mt-4 text-2xl font-serif italic leading-10 text-white">
          {review.reviewText}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div>
            <p className="text-base font-bold text-white">{review.reviewerName}</p>
            <p className="mt-1 text-sm text-gray-400">
              {review.city} / {review.platform}
            </p>
          </div>
          <div className="text-xl tracking-[0.3em] text-[#D4AF37]">★★★★★</div>
        </div>
      </div>
    </div>
  </section>
);

const parseBlogDate = (fileContent: string) => {
  const match = fileContent.match(/date:\s*"([^"]+)"/);
  return match?.[1] || null;
};

const stripMarkdownText = (value: string) =>
  value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();

const parseBlogFaqItems = (paragraphs: string[]): BlogFaqItem[] => {
  const faqItems: BlogFaqItem[] = [];
  let currentQuestion = '';

  paragraphs.forEach((paragraph) => {
    const questionMatch = paragraph.match(/^\*\*(.+?)\*\*$/);

    if (questionMatch) {
      currentQuestion = stripMarkdownText(questionMatch[1]);
      return;
    }

    if (currentQuestion) {
      faqItems.push({
        question: currentQuestion,
        answer: stripMarkdownText(paragraph),
      });
      currentQuestion = '';
    }
  });

  return faqItems;
};

const buildBlogSupplementalSections = (
  blog: (typeof blogsData)[number],
  serviceLinks: { href: string; label: string }[]
): BlogSection[] => {
  const primaryService = serviceLinks[0] || { href: '/general-contractor-los-angeles', label: 'General Contracting' };
  const secondaryService = serviceLinks[1] || { href: '/kitchen-remodel-los-angeles', label: 'Kitchen Remodel' };
  const tertiaryService = serviceLinks[2] || { href: '/home-addition-contractor-los-angeles', label: 'Home Addition' };
  const keyword = blog.keyword || blog.title;

  return [
    {
      id: slugifyHeading('What this means for Los Angeles homeowners'),
      title: 'What this means for Los Angeles homeowners',
      paragraphs: [
        `Los Angeles owners reading about ${keyword} usually are not trying to collect trivia. They are deciding whether the scope makes financial sense, whether the city will allow it, and whether the house can absorb the work without schedule drift or a stack of change orders. That is why the right next step is rarely just “get three bids.” It is understanding what triggers permits, where existing conditions are likely to break the budget, and whether the property should be treated like a focused remodel, a structural reconfiguration, or a larger design-build project.`,
        `At Red Stag, we approach that decision with the same field logic we use on active jobs. We look at layout, utilities, structure, access, finish expectations, and the local review path before we tell an owner what the number should be. If this article connects directly to your project, our ${primaryService.label.toLowerCase()} work is usually the most relevant place to start because it shows how we price the scope, sequence approvals, and keep production accountable once the house is open. From there, we can tell you quickly whether the smartest move is to stay focused or widen the project to solve more of the house in one pass.`,
      ],
    },
    {
      id: slugifyHeading('How Red Stag plans scope, approvals, and production'),
      title: 'How Red Stag plans scope, approvals, and production',
      paragraphs: [
        `The gap between a clean article and a clean build is planning. Homeowners in this market get into trouble when the scope sounds simple but the field conditions say otherwise. We close that gap by tying early decisions to the actual site. That means reviewing permit triggers, asking whether electrical or plumbing upgrades are hiding behind finished walls, confirming lead times before demolition starts, and deciding whether the work needs to be staged around an occupied home, HOA review, or a tighter city correction cycle.`,
      ],
      subSections: [
        {
          title: 'Scope and permit path',
          paragraphs: [
            `A lot of projects that start with one room or one upgrade expand as soon as the owner sees what else should be solved while the house is already open. That can be smart, but only if the scope expansion is managed intentionally. We usually show clients the tradeoff between staying focused and pulling in adjacent work like ${secondaryService.label.toLowerCase()} so they can compare downtime, permit exposure, and overall value before signing a contract. In Los Angeles, that kind of decision can save months of repeat disruption.`,
          ],
        },
        {
          title: 'Schedule, procurement, and site control',
          paragraphs: [
            `Once the path is clear, the work still needs real production control. That means ordering long-lead materials early, sequencing inspections around the actual scope, and deciding whether related items like ${tertiaryService.label.toLowerCase()} should be priced now instead of revisited after closeout. Owners who plan that far ahead usually protect both budget and momentum. Owners who do not are the ones reopening walls, paying rush fees, and wondering why the original timeline never had a chance.`,
          ],
        },
      ],
    },
  ];
};

const parseBlogSections = (
  blog: (typeof blogsData)[number],
  fileContent: string,
  serviceLinks: { href: string; label: string }[]
) => {
  const withoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, '').trim();
  const withoutSchema = withoutFrontmatter.replace(/<script[\s\S]*?<\/script>/g, '').trim();
  const withoutClosingCta = withoutSchema.replace(/\n---\s*\n\*Ready[\s\S]*$/i, '').trim();
  const lines = withoutClosingCta.split('\n');
  const preambleParagraphs: string[] = [];
  const contentSections: { title: string; paragraphs: string[] }[] = [];
  let currentSection: { title: string; paragraphs: string[] } | null = null;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    const text = stripMarkdownText(paragraphBuffer.join(' ').trim());
    if (!text) {
      paragraphBuffer = [];
      return;
    }

    if (currentSection) {
      currentSection.paragraphs.push(text);
    } else {
      preambleParagraphs.push(text);
    }

    paragraphBuffer = [];
  };

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      flushParagraph();
      return;
    }

    if (line.startsWith('## ')) {
      flushParagraph();
      currentSection = {
        title: stripMarkdownText(line.replace(/^##\s+/, '')),
        paragraphs: [],
      };
      contentSections.push(currentSection);
      return;
    }

    if (!line.trim()) {
      flushParagraph();
      return;
    }

    paragraphBuffer.push(line.trim());
  });

  flushParagraph();

  const foundationSection = contentSections.find((section) => section.title === 'The Foundation of Success');
  const faqSourceSection = contentSections.find((section) => section.title === 'Frequently Asked Questions');
  const faqItems = parseBlogFaqItems(faqSourceSection?.paragraphs || []);
  const supplementalSections = buildBlogSupplementalSections(blog, serviceLinks);
  const introSection: BlogSection = {
    id: slugifyHeading('Why this matters in Los Angeles'),
    title: 'Why this matters in Los Angeles',
    paragraphs: [
      ...preambleParagraphs,
      `When clients call Red Stag after reading about ${blog.keyword || blog.title}, the question is usually not whether the idea sounds good. The question is whether the house, the city, and the schedule all support the same answer. That is why we put practical planning ahead of sales language. The earlier the scope is pressure-tested, the easier it is to protect the owner from false assumptions about price, permits, and timeline.`,
    ],
  };
  const mainFoundationSection: BlogSection = {
    id: slugifyHeading(foundationSection?.title || 'The Foundation of Success'),
    title: foundationSection?.title || 'The Foundation of Success',
    paragraphs: foundationSection?.paragraphs || [],
  };
  const faqSection: BlogSection = {
    id: slugifyHeading('Frequently Asked Questions'),
    title: 'Frequently Asked Questions',
    paragraphs: faqItems.length === 0 ? ['Read through the planning points above, then contact Red Stag if you need a project-specific answer for your property.'] : [],
    subSections: faqItems.map((item) => ({
      title: item.question,
      paragraphs: [item.answer],
    })),
  };

  return {
    sections: [introSection, mainFoundationSection, ...supplementalSections, faqSection],
    faqItems,
  };
};

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

const locationServiceDescriptions: Record<string, string> = {
  'Kitchen Remodel': 'Layout changes, cabinets, stone, lighting, and permit-managed kitchen rebuilds.',
  'Bathroom Remodel': 'Waterproofed bathroom renovations with plumbing, tile, glass, and finish coordination.',
  'ADU Contractor': 'Detached ADUs, attached units, and garage conversions planned around zoning and utilities.',
  'Custom Home Builder': 'Ground-up custom homes with design-build coordination, engineering, and field execution.',
  'Home Addition': 'Room additions and second-story work that tie new square footage into the existing house.',
  'General Contracting': 'Full-project management across permits, scheduling, trade coordination, and delivery.',
  'Hardscape & Concrete': 'Driveways, retaining walls, patios, drainage work, and outdoor living construction.',
  'Fence Company': 'Privacy fences, gates, and access systems installed to fit grade, frontage, and security needs.',
  'Window Replacement': 'Title 24-aware window replacement with flashing, weatherproofing, and finish repair.',
};

const serviceTileOrder = [
  'Kitchen Remodel',
  'Bathroom Remodel',
  'ADU Contractor',
  'Custom Home Builder',
  'Home Addition',
  'General Contracting',
  'Hardscape & Concrete',
  'Fence Company',
  'Window Replacement',
];

const tierPricingMap: Record<1 | 2 | 3 | 4 | 5, TierPricing> = {
  1: {
    title: 'Tier 1 premium market pricing',
    summary: 'Estate neighborhoods, hillside complexity, tighter reviews, and premium finish expectations push these cities to the top of the Los Angeles pricing curve.',
    kitchen: '$120K-$250K+',
    bathroom: '$70K-$150K+',
    adu: '$275K-$500K+',
    customHome: '$1.5M+',
  },
  2: {
    title: 'Tier 2 high-end market pricing',
    summary: 'These cities still carry premium labor, finish, and review costs, but the work usually lands a step below the estate-tier pricing of the most expensive enclaves.',
    kitchen: '$95K-$180K+',
    bathroom: '$60K-$120K+',
    adu: '$225K-$375K+',
    customHome: '$1M-$2M+',
  },
  3: {
    title: 'Tier 3 established-family market pricing',
    summary: 'These neighborhoods see steady remodel, ADU, and addition demand, with budgets shaped by older housing stock, permitting, and finish level more than trophy-property premiums.',
    kitchen: '$85K-$150K',
    bathroom: '$50K-$90K',
    adu: '$200K-$325K',
    customHome: '$800K-$1.5M',
  },
  4: {
    title: 'Tier 4 active-remodel market pricing',
    summary: 'These locations support strong renovation activity, but pricing is usually driven by site conditions, code upgrades, and scope discipline rather than ultra-premium finishes.',
    kitchen: '$68K-$125K',
    bathroom: '$45K-$85K',
    adu: '$180K-$300K',
    customHome: '$700K-$1.2M',
  },
  5: {
    title: 'Tier 5 value-focused market pricing',
    summary: 'These cities still require licensed work and real permits, but owners are often balancing practical scope, tighter budgets, and efficient production.',
    kitchen: '$59K-$108K',
    bathroom: '$40K-$75K',
    adu: '$160K-$260K',
    customHome: '$600K-$1M',
  },
};

const locationTemplateConfig: Record<string, LocationTemplateConfig> = {
  'Beverly Hills': {
    tier: 1,
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'Custom homes, estate remodels, and design-build work planned for Beverly Hills review standards and premium finish expectations.',
    serviceLinkSlug: '/custom-home-builder-los-angeles',
    serviceLinkLabel: 'custom home build',
    introStart:
      'Building in Beverly Hills means stepping into an approval environment that behaves nothing like a standard LADBS job. This city runs through the independent City of Beverly Hills Building Department, not LADBS, and the difference shows up immediately in plan review pace, fee structure, and finish expectations.',
    introEnd:
      'Trousdale Estates and Benedict Canyon add hillside complexity, structural review, and access planning that can change design decisions before excavation ever starts. Permit fees are significantly higher than LADBS, design review requirements are more demanding, and homeowners here expect Sub-Zero, Wolf, and bookmatched stone to be baseline conversation items rather than luxury add-ons.',
    marketContext:
      'The Beverly Hills market rewards precision. Owners are often balancing resale expectations, architectural identity, and neighborhood standards that leave very little room for amateur execution. A kitchen, addition, or whole-house renovation here is judged not only by how it looks on completion day, but by whether every reveal line, slab seam, cabinet detail, and exterior transition feels appropriate for a property in a zip code where buyers expect top-tier work as a given.',
    processContext:
      'Preconstruction in Beverly Hills has to be handled with discipline. We review survey information, grade, drainage, hillside conditions, consultant requirements, and city comments early because redesign later is expensive. On estate properties, staging and protection are also part of the plan from day one. Deliveries, neighbor sensitivity, gate coordination, and the timing of loud work all need to be solved before crews mobilize.',
    redStagContext:
      'Red Stag fits Beverly Hills because we are used to permit-heavy, finish-sensitive work where clients need one team handling design-build coordination instead of juggling disconnected architects, consultants, and field crews. We speak directly about allowances, lead times, inspection strategy, and detail execution because this market punishes vague planning. When owners are investing at Beverly Hills levels, the job has to be administratively sharp and physically well built.',
    permitFocus:
      'The independent City of Beverly Hills Building Department controls the process here, and that changes plan review, permit fees, and correction cycles compared with LADBS.',
    siteFocus:
      'Trousdale Estates, Benedict Canyon adjacency, and other hillside parcels create structural, retaining, drainage, and access issues that can delay work if they are not studied up front.',
    prepFocus:
      'Owners should be ready with surveys, design intent, finish expectations, and consultant coordination because Beverly Hills reviewers expect a cleaner package and a more complete answer set than many standard city submittals.',
    projectFocus:
      'Most Beverly Hills work leans toward custom homes, large remodels, major kitchen projects, additions, and finish-sensitive estate upgrades.',
    logisticsFocus:
      'Schedule control in Beverly Hills depends on review management, premium procurement, protected staging, and crews that can execute without damaging high-value finishes already in the home.',
    differentiatorFocus:
      'Homeowners here call Red Stag early because they want a contractor who can protect both the budget and the design intent in a market where mistakes are expensive and visible.',
    relatedCities: ['Bel Air', 'Brentwood', 'West Hollywood'],
  },
  'Bel Air': {
    tier: 1,
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'Custom homes, hillside remodels, and estate construction managed around canyon access, private roads, and high-value neighboring properties.',
    serviceLinkSlug: '/custom-home-builder-los-angeles',
    serviceLinkLabel: 'custom home build',
    introStart:
      'Bel Air is a logistics and structural market before it is a finish market. The homes are high value, the lots are often steep or irregular, and gated community access coordination can affect everything from site walks to material deliveries.',
    introEnd:
      'Private road maintenance issues, HOA restrictions, and occasional HPOZ historic preservation considerations create a review environment where assumptions get expensive fast. When neighboring properties sit in the $5M-$50M range, every detail matters, from noise planning to retaining design to how long a crane or concrete pump occupies the road.',
    marketContext:
      'A Bel Air project is rarely just a cosmetic renovation. Owners are often evaluating whether to remodel, add on, or rebuild while protecting the value of a property that is already surrounded by highly scrutinized homes. Canyon lot structural complexity means soils, retaining, slope drainage, and utility routing are usually central cost drivers. That makes early feasibility work more important here than in flatter neighborhoods where the site is more forgiving.',
    processContext:
      'The preconstruction sequence in Bel Air has to account for access, consultant alignment, and sequencing with the site itself. We look at turn radii for trucks, staging options, retaining implications, private road rules, and whether neighbors or HOAs have protocol requirements before the first phase of work starts. The wrong contractor learns those lessons late. We would rather solve them before pricing is locked.',
    redStagContext:
      'Red Stag works well in Bel Air because we treat the job as both a site-control problem and a construction problem. Clients here need direct communication, strong supervision, and a contractor who understands that the physical build, neighborhood protocol, and design expectations all move together. That is especially true on hillside properties where one missed assumption on drainage or access can stall everything behind it.',
    permitFocus:
      'Bel Air work usually routes through LADBS and related review agencies, but gated communities, historic considerations, and hillside triggers can complicate what looks simple on paper.',
    siteFocus:
      'Canyon lots, private roads, retaining needs, and access limits are the main reasons permits and schedules stretch in Bel Air.',
    prepFocus:
      'Owners should gather surveys, soils information when applicable, HOA requirements, and access details early so the project team is not redesigning around site realities after permit comments arrive.',
    projectFocus:
      'Bel Air owners most often call for custom homes, high-end additions, estate remodels, and large kitchen or primary-suite transformations tied to structural work.',
    logisticsFocus:
      'We manage Bel Air projects by coordinating gates, neighbors, delivery windows, parking, and heavy-access days before they become field problems.',
    differentiatorFocus:
      'Clients in Bel Air call Red Stag because they need a team that can protect schedule and detail quality on a site where both the house and the surrounding context are high stakes.',
    relatedCities: ['Beverly Hills', 'Brentwood', 'Pacific Palisades'],
  },
  'Brentwood': {
    tier: 2,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'High-end remodels, additions, and design-build work for Brentwood homes from the flats below San Vicente to the hills above Sunset.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Brentwood is one of the few Westside markets where the site conditions can change dramatically from one block to the next. The flatter residential pockets below San Vicente do not behave like the hillside properties climbing above Sunset, and a contractor who treats them the same is usually missing cost and schedule risk.',
    introEnd:
      'That difference matters on everything from foundations and drainage to staging and neighbor impact. Owners here still expect premium finish quality, but the smarter approach is to solve the site and permit realities first so the design vision has a real path to construction.',
    marketContext:
      'Brentwood clients are typically improving already valuable homes, so the conversation is less about whether to build and more about how to build without creating avoidable friction. Large lots in some areas support additions and ADUs more comfortably than denser neighborhoods do. Nearby commercial corridors and UCLA-adjacent traffic patterns can also affect scheduling, deliveries, and how a job interacts with the street. That combination makes Brentwood a planning-heavy market even when the visible scope looks straightforward.',
    processContext:
      'We approach Brentwood by separating the flat-lot assumptions from the hillside assumptions early. That means checking drainage, access, structural triggers, and any neighborhood review concerns before scope is finalized. On the design side, owners here usually want the house to feel refined but not generic, which means the detailing, material lead times, and coordination between design and build have to stay tight throughout production.',
    redStagContext:
      'Red Stag is a good fit for Brentwood because we can run either a straightforward high-end remodel or a more complex hillside project without changing systems halfway through. Clients here need a team that can price honestly, communicate clearly, and keep both quality and neighborhood sensitivity under control. That is exactly where design-build coordination has value.',
    permitFocus:
      'Brentwood work usually runs through LADBS, but hillside triggers, grading, and street logistics can change how the permit and engineering path unfolds.',
    siteFocus:
      'The biggest delays come from treating hillside parcels like flat lots, underestimating drainage and retaining, or ignoring the influence of traffic and adjacency around busier corridors.',
    prepFocus:
      'Homeowners should bring clear scope priorities, surveys when available, and a realistic finish target so pricing reflects the actual Brentwood market instead of a generic Los Angeles average.',
    projectFocus:
      'Typical Brentwood scopes include major remodels, kitchen-centered upgrades, additions, ADUs on larger lots, and whole-home reworks that need tighter finish control.',
    logisticsFocus:
      'We manage Brentwood jobs by planning deliveries, street impact, hillside access when applicable, and the transition between old and new work before the field team is mobilized.',
    differentiatorFocus:
      'Brentwood owners call Red Stag because they want one contractor who can handle both the administrative side of the job and the finish-sensitive side without handing problems off midstream.',
    relatedCities: ['Beverly Hills', 'Bel Air', 'Santa Monica'],
  },
  'Malibu': {
    tier: 1,
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'Custom homes and coastal construction managed around Coastal Commission review, fire-zone requirements, and long permit timelines.',
    serviceLinkSlug: '/custom-home-builder-los-angeles',
    serviceLinkLabel: 'custom home build',
    introStart:
      'Malibu projects are defined by approvals before they are defined by finishes. California Coastal Commission approval is required for most projects in Malibu, and LUP Local Use Plan compliance shapes everything from site coverage to exterior changes to how a project is documented before it can move toward construction.',
    introEnd:
      'Fire zone requirements, fire-hardened materials, well and septic systems, and geological reports for hillside work all push Malibu into a different category than most Los Angeles jobs. Permit timelines often run 6 to 12 months for coastal projects, so the only workable strategy is to plan early, document clearly, and price the real approval path instead of pretending this market moves on a standard city schedule.',
    marketContext:
      'Owners in Malibu are usually balancing ocean exposure, slope conditions, insurance pressure, and long-term durability at the same time. A beautiful project that is not designed around coastal air, wildfire risk, or water and wastewater realities is not actually a well-planned project. Material selection has to account for corrosion, maintenance, and code. Site planning has to account for topography, erosion, and access. That is why Malibu is a market where the preconstruction team matters as much as the field crew.',
    processContext:
      'Our Malibu process starts with entitlement and technical review: survey, geology when required, utility strategy, septic or well implications, fire hardening, and coastal path. Only after that do we finalize pricing and build sequence, because those inputs determine whether the design is truly buildable. Once approvals are moving, we treat procurement, delivery routes, and weather exposure as part of the schedule, not side notes.',
    redStagContext:
      'Red Stag works well in Malibu because we are comfortable running a job where consultant coordination, approval tracking, and field execution all have to stay synchronized for months. Homeowners here need a contractor that respects the pace of coastal review while still protecting momentum once construction begins. That is exactly what design-build discipline is for.',
    permitFocus:
      'Malibu approvals usually involve the City of Malibu process plus California Coastal Commission review and LUP Local Use Plan compliance, which is why permit timelines stretch far beyond a typical LADBS schedule.',
    siteFocus:
      'Hillside geology, fire zone overlap, septic and well conditions, and coastal-material performance are the issues that most often slow Malibu jobs.',
    prepFocus:
      'Owners should expect early consultant work, technical reports, and a longer approval runway before final pricing or construction dates can be treated as firm.',
    projectFocus:
      'Malibu clients most often pursue custom homes, fire-rebuild work, whole-home remodels, premium additions, and major exterior reconstruction shaped by coastal constraints.',
    logisticsFocus:
      'We manage Malibu work by coordinating long-lead approvals, coastal deliveries, protected staging, and materials that can tolerate salt air and wildfire-driven code requirements.',
    differentiatorFocus:
      'Homeowners call Red Stag in Malibu because they need a builder who understands that coastal review, geology, and field execution are one continuous process, not separate departments.',
    relatedCities: ['Pacific Palisades', 'Calabasas', 'Santa Monica'],
  },
  'Pacific Palisades': {
    tier: 1,
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'High-end homes and major rebuilds shaped by geology, coastal influence, and premium finish expectations in Pacific Palisades.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Pacific Palisades sits at the intersection of premium residential expectations and highly specific site risk. Landslide zone geological reports are a real part of the conversation on many properties, and the coastal influence on materials changes what should be specified even when the project is not directly on the bluff.',
    introEnd:
      'Fire zone overlap is another practical issue, especially when owners are rebuilding or substantially upgrading exterior systems. The Palisades Village area also affects aesthetics and expectations, because homes near those active pockets are judged closely for curb appeal, materials, and overall fit with the neighborhood.',
    marketContext:
      'This is a high-income market where homeowners expect thoughtful design and durable construction, not quick cosmetic work. A project here often has to meet two tests at once: it needs to feel elevated enough for Pacific Palisades, and it needs to be technically sound enough to deal with geology, exposure, and fire considerations. That balance affects everything from framing and retaining to exterior cladding and window packages. It also changes the budget conversation, because the cheapest path is rarely the path that protects the house long term.',
    processContext:
      'We approach Pacific Palisades by reviewing slope, geology, drainage, exposure, and neighborhood context early. That allows us to line up the right engineering and design decisions before pricing is finalized. On homes with major exterior scope, material compatibility and long-term maintenance are part of the preconstruction discussion, not a late substitution after approvals are already in motion.',
    redStagContext:
      'Red Stag fits Pacific Palisades because we can handle premium remodeling, additions, and rebuild work without losing sight of the site itself. Clients here need a contractor who can move between consultant coordination, permit strategy, and finish execution without letting one side of the project outrun the other. That balance is what keeps quality high and surprises lower.',
    permitFocus:
      'Pacific Palisades projects often route through LADBS, but landslide zone reporting, slope review, and fire-zone conditions can add significant consultant and approval requirements.',
    siteFocus:
      'Geology, retaining, drainage, and material performance near the coast are the main issues that delay or reshape projects in the Palisades.',
    prepFocus:
      'Homeowners should prepare for geotechnical input when needed, realistic finish budgets, and design choices that respond to both the site and the premium neighborhood standard.',
    projectFocus:
      'Most calls in Pacific Palisades center on whole-home remodels, large additions, rebuilds, and high-end kitchens or exteriors that need strong detailing.',
    logisticsFocus:
      'We manage Palisades work by front-loading reports, coordinating consultant timing, and protecting the schedule from geology or material issues that could have been identified earlier.',
    differentiatorFocus:
      'Owners here call Red Stag because they need a contractor who can keep a premium project grounded in real site conditions instead of selling an idealized schedule that does not survive review.',
    relatedCities: ['Malibu', 'Brentwood', 'Santa Monica'],
  },
  'Manhattan Beach': {
    tier: 2,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'High-end coastal remodels and new construction that account for beach-city permitting, setbacks, and salt-air performance.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Manhattan Beach is really two construction markets in one. The Sand Section and the Hill Section have completely different structural and planning demands, and a contractor who prices them the same is ignoring the thing that most directly controls risk.',
    introEnd:
      'Coastal setbacks, beach-city permit office requirements, and salt air corrosion considerations all affect how materials, details, and schedules should be handled. On tighter lots near the beach, small mistakes in staging or sequencing can cost real time because there is so little room to recover in the field.',
    marketContext:
      'Owners in Manhattan Beach are usually investing in either compact high-value coastal homes or larger hillside residences with strong design expectations. In both cases, the margin for sloppy planning is small. Material choices need to perform in marine air. Exterior details need to resist weather. Structural and foundation assumptions need to match the exact lot condition rather than a generic coastal average. That is why this city rewards contractors who can think through logistics and durability at the same time.',
    processContext:
      'We review section-specific realities up front. In the Sand Section, lot constraints, access, setbacks, and sequencing lead the conversation. In the Hill Section, grade, views, and structure tend to carry more weight. From there we align pricing, permit strategy, and procurement around the actual property so the field team is not improvising once work begins.',
    redStagContext:
      'Red Stag is a strong fit for Manhattan Beach because our process does not rely on broad assumptions. We break the job down by site type, review path, and finish goal, then build the schedule from those realities. That is what clients here need when the work is high value and the lot itself is part of the challenge.',
    permitFocus:
      'Manhattan Beach runs through its own beach-city permit office, so timelines, comments, and coastal considerations do not mirror a standard LADBS project.',
    siteFocus:
      'The split between the Sand Section and the Hill Section, combined with setbacks and marine exposure, is what delays or reshapes projects here most often.',
    prepFocus:
      'Owners should prepare for tight lot logistics, corrosion-aware material selections, and a clear understanding of whether the property behaves more like a compact coastal parcel or a hillside home.',
    projectFocus:
      'Common Manhattan Beach scopes include full-home remodels, coastal additions, premium kitchens, exterior envelope upgrades, and ground-up replacement homes.',
    logisticsFocus:
      'We manage Manhattan Beach projects by matching the staging plan, delivery sequence, and material selections to the specific section and exposure of the property.',
    differentiatorFocus:
      'Clients here call Red Stag because they need a builder who can make precise decisions on expensive lots without wasting time learning the city mid-project.',
    relatedCities: ['Santa Monica', 'Malibu', 'West Hollywood'],
  },
  'Santa Monica': {
    tier: 2,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'High-end remodels and additions planned for Santa Monica green-building review, older structures, and dense urban sites.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Santa Monica is one of the clearest examples of why a contractor has to know the local department, not just general code. The independent City of Santa Monica Building Department runs its own process, and progressive green building requirements shape design and scope decisions much earlier than many owners expect.',
    introEnd:
      'High density, older structures, and rent control ordinances that affect ADU strategy add another layer. A project that would move in a straightforward way through LADBS can slow down here if the team is not prepared for local review culture, sustainability requirements, and the realities of working on tighter lots with older building stock.',
    marketContext:
      'Santa Monica owners are often improving homes or multi-unit properties that have good underlying value but need sharper planning than the visible finishes suggest. Older framing, outdated systems, tight side yards, and neighborhood sensitivity all influence cost. Green-building compliance can also affect selections and documentation. That means a Santa Monica project succeeds when the contractor understands both field conditions and the citys expectations for how the work is documented and inspected.',
    processContext:
      'We approach Santa Monica by reviewing permit path, energy and green-building implications, existing building condition, and how the job will function on a tighter urban site. If ADU strategy or unit configuration is part of the conversation, we also evaluate how local ordinances affect what actually pencils out. That keeps clients from spending early design money in the wrong direction.',
    redStagContext:
      'Red Stag fits Santa Monica because we are comfortable combining city-specific review management with hands-on production planning. Clients here need clean drawings, realistic scheduling, and a contractor who will not get surprised by sustainability requirements or the challenges of older dense properties. That combination is what keeps the work moving.',
    permitFocus:
      'The independent City of Santa Monica Building Department and its progressive green building requirements are the first things we account for on any serious project here.',
    siteFocus:
      'Dense lots, older structures, tenant or unit considerations, and urban staging are the main issues that slow Santa Monica work.',
    prepFocus:
      'Owners should prepare for a more documentation-heavy review path, realistic urban-site logistics, and careful assessment of older framing, mechanical, and utility conditions.',
    projectFocus:
      'Santa Monica work often includes remodels, additions, ADU strategy tied to local rules, and high-detail upgrades to aging but valuable homes.',
    logisticsFocus:
      'We manage Santa Monica jobs by coordinating permit review, neighborhood impact, deliveries, and field protection around the tighter physical conditions of the city.',
    differentiatorFocus:
      'Homeowners call Red Stag in Santa Monica because they want a contractor that can speak both to the city and to the field, rather than discovering each requirement one correction at a time.',
    relatedCities: ['Brentwood', 'Pacific Palisades', 'Manhattan Beach'],
  },
  'Studio City': {
    tier: 3,
    heroImage: '/images/services/kitchen.jpg',
    heroSubline: 'Kitchen-led remodels, additions, and whole-home upgrades for Studio City ranch homes, hill properties, and active neighborhood review.',
    serviceLinkSlug: '/kitchen-remodel-los-angeles',
    serviceLinkLabel: 'kitchen remodel',
    introStart:
      'Studio City sits squarely in LADBS jurisdiction, but that does not make it a simple market. The Ventura Blvd corridor creates commercial adjacency issues on some properties, while the residential streets south of the boulevard are full of 1940s-1960s ranch homes that often hide old systems behind updated finishes.',
    introEnd:
      'In the hills, mid-century modern architecture is common and the design expectations are different again. Neighborhood councils here are active and vocal, so clean sites, predictable scheduling, and respectful field management matter more than contractors sometimes realize.',
    marketContext:
      'Studio City owners usually want houses that feel more open, more efficient, and more current without losing the identity that made them buy in the neighborhood in the first place. That often points to kitchens, additions, whole-home remodels, and ADUs on lots that have real value but also carry aging plumbing, electrical, and framing. The opportunity is strong, but so is the need for disciplined preconstruction because the hidden conditions are real.',
    processContext:
      'We start by evaluating the age and type of the house. A south-of-Ventura ranch home, a hillside mid-century, and a lot near more active commercial corridors all behave differently. Then we align permit scope, budget, and design to that specific property. On Studio City work, that usually means solving systems, circulation, and sequencing before anyone gets distracted by finish boards.',
    redStagContext:
      'Red Stag fits Studio City because we are comfortable modernizing older housing stock while keeping the process organized and the site professional. Homeowners here want direct advice, realistic timelines, and a contractor who understands that neighborhood reputation matters. That is how we run the work.',
    permitFocus:
      'Studio City runs through LADBS, but the actual difficulty depends on whether the project touches structure, hillside review, or utilities hidden in older homes.',
    siteFocus:
      'The biggest delays come from older house systems, hillside conditions in the hills, and adjacency issues near Ventura Blvd where access and planning have to be tighter.',
    prepFocus:
      'Owners should be ready for honest investigation into electrical, plumbing, and structural conditions before final numbers are treated as fixed.',
    projectFocus:
      'Studio City demand centers on kitchen remodels, ADUs, additions, and whole-home updates that improve daily use while protecting neighborhood value.',
    logisticsFocus:
      'We manage Studio City work with tight field coordination, neighbor-aware scheduling, and direct communication about what older houses are likely to reveal once demolition starts.',
    differentiatorFocus:
      'Studio City homeowners call Red Stag early because they want a contractor who has seen this housing stock before and will not pretend the hidden work is optional.',
    relatedCities: ['Sherman Oaks', 'Encino', 'Burbank'],
  },
  'Sherman Oaks': {
    tier: 3,
    heroImage: '/images/services/kitchen.jpg',
    heroSubline: 'Kitchen remodels, ADUs, and additions planned around Sherman Oaks housing stock, lot size, and LADBS review.',
    serviceLinkSlug: '/kitchen-remodel-los-angeles',
    serviceLinkLabel: 'kitchen remodel',
    introStart:
      'Sherman Oaks is one of the strongest remodel markets in the Valley because the lot sizes are good and the houses often have room to improve, but the existing conditions are rarely as clean as they look. The area sits in LADBS jurisdiction, and homes built from the 1950s through the 1970s regularly reveal knob-and-tube electrical remnants, cast iron plumbing, undersized panels, or framing changes from prior work.',
    introEnd:
      'Those realities matter because they affect how additions, kitchens, ADUs, and whole-home upgrades should be priced from the start. Homes near Ventura Blvd also require commercial adjacency planning, so access, parking, and site behavior need to be managed with more care than on a quiet interior block.',
    marketContext:
      'Sherman Oaks owners usually want more usable square footage, better family flow, and a house that feels current without leaving the neighborhood. The generous lots create a strong ADU market, and many clients are deciding between a kitchen-led remodel, a room addition, or a larger reconfiguration that solves several issues at once. The opportunity is real, but so is the need to account for aging systems before a cosmetic scope turns into a structural and utility job halfway through.',
    processContext:
      'We begin with the age of the house, lot potential, and system condition. If the property is a candidate for an ADU or major addition, we review setbacks, utilities, and access right away. If it is a kitchen-driven remodel, we still pressure-test electrical and plumbing assumptions because Sherman Oaks houses often hide costly surprises behind finished walls. That due diligence protects the schedule later.',
    redStagContext:
      'Red Stag works well in Sherman Oaks because we know how to modernize older Valley homes without losing control of the scope when the hidden conditions appear. Clients here need honest budgeting, practical sequencing, and a team that can handle both family-friendly remodeling and permit-heavy additions. That combination is exactly where we operate best.',
    permitFocus:
      'Sherman Oaks projects run through LADBS, but permit scope expands quickly when older electrical, plumbing, or framing issues are uncovered.',
    siteFocus:
      'The biggest issues are aging systems, larger-lot development potential, and commercial adjacency planning near Ventura Blvd.',
    prepFocus:
      'Owners should prepare for real investigation into utilities and prior work so the estimate reflects the actual house rather than the finished surfaces alone.',
    projectFocus:
      'Sherman Oaks demand is strongest for kitchens, ADUs, family-oriented additions, and whole-home updates that make older houses function better.',
    logisticsFocus:
      'We manage Sherman Oaks jobs by treating old-house discoveries as likely, not exceptional, and by planning staging and access carefully on busier corridors.',
    differentiatorFocus:
      'Homeowners call Red Stag in Sherman Oaks because they want a builder who can handle scope growth intelligently instead of acting surprised by what these houses usually contain.',
    relatedCities: ['Studio City', 'Encino', 'Tarzana'],
  },
  'Encino': {
    tier: 3,
    heroImage: '/images/services/kitchen.jpg',
    heroSubline: 'Kitchen remodels, additions, and estate-scale modernization for Encino ranch homes and hillside properties.',
    serviceLinkSlug: '/kitchen-remodel-los-angeles',
    serviceLinkLabel: 'kitchen remodel',
    introStart:
      'Encino is a classic modernization market. The neighborhood is full of sprawling mid-century ranch homes that are structurally worth improving but often function like houses built for a different era. Larger lot sizes typical to the SFV create room for additions, ADUs, and significant exterior work, while the affluent demographic pushes finish expectations much higher than a generic Valley price sheet would suggest.',
    introEnd:
      'Projects north of Ventura require hillside structural expertise, so the city can shift quickly from flat-lot remodeling into retaining, drainage, and access coordination. That split is one reason Encino projects need better planning than homeowners often expect on the first site visit.',
    marketContext:
      'Most Encino clients are not trying to make small cosmetic moves. They want broader modernization: a kitchen that works for entertaining, a primary suite that feels current, an addition that makes the floor plan function, or a full-house refresh that brings an older ranch into line with the neighborhood standard. Because the homes are often large, small estimating errors multiply fast. The right contractor has to understand both scale and restraint so the house improves without turning into a patchwork of disconnected upgrades.',
    processContext:
      'We approach Encino by first sorting out whether the property behaves like a flat ranch remodel, a large-lot expansion, or a hillside-influenced project north of Ventura. That determines engineering needs, permit timing, and how aggressively we can sequence the work. From there we align scope, allowances, and finish selections so the project fits both the house and the market it sits in.',
    redStagContext:
      'Red Stag fits Encino because we are comfortable with high-finish residential work that still needs disciplined pricing and construction management. Homeowners here want a contractor who can handle size, detail, and old-house realities at the same time. That is exactly the kind of project control our design-build process is built for.',
    permitFocus:
      'Encino work usually routes through LADBS, but hillside conditions north of Ventura can add structural and grading review that materially affects the timeline.',
    siteFocus:
      'The main delay points are hillside structural demands, large-scope modernization, and the temptation to underprice older systems in big mid-century homes.',
    prepFocus:
      'Owners should prepare for honest conversations about finish level, structural scope, and whether the property is better served by a focused remodel or a wider reconfiguration.',
    projectFocus:
      'Encino demand is strongest for kitchens, additions, whole-home modernization, and high-end residential updates on larger lots.',
    logisticsFocus:
      'We manage Encino projects by matching the schedule and trade stack to the actual scale of the house, not just to the headline scope on the estimate.',
    differentiatorFocus:
      'Encino homeowners call Red Stag because they want a contractor who can modernize a large, expensive house without letting the process get loose.',
    relatedCities: ['Sherman Oaks', 'Tarzana', 'Calabasas'],
  },
  'Calabasas': {
    tier: 3,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'High-finish remodels and additions managed around strict HOA review, gated access, and premium suburban expectations in Calabasas.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Calabasas is a market where administration matters as much as field work. HOA restrictions are some of the strictest in Los Angeles County, and gated community access coordination through multiple guard gates can control when crews, deliveries, and inspections actually happen.',
    introEnd:
      'Las Virgenes Municipal Water District requirements and a premium finish market add more layers. That means a contractor who looks fine on a typical Valley remodel can lose control quickly here if the paperwork, scheduling, and access planning are not airtight from the start.',
    marketContext:
      'Calabasas homeowners expect organized, discreet, high-quality work. The houses are often large, the communities are managed closely, and owners do not have patience for messy sites or vague communication. Projects usually involve meaningful finish upgrades, additions, kitchens, exterior work, or whole-home remodeling rather than minor patch jobs. Because community standards are strong, the project has to satisfy both the owner and the review environment surrounding the property.',
    processContext:
      'We front-load Calabasas projects with HOA review strategy, access planning, utility awareness, and a realistic procurement schedule. The goal is to remove preventable friction before the work starts. Once the job is active, we keep logistics tight because the daily operation of the site matters almost as much as the end result in many of these communities.',
    redStagContext:
      'Red Stag fits Calabasas because we can manage premium residential work without treating the administrative side as an afterthought. Clients here need a team that can talk to HOAs, manage guard-gate logistics, and still deliver a strong field product. That combination is where disciplined design-build work pays off.',
    permitFocus:
      'Calabasas projects can involve city review plus strict HOA layers, and Las Virgenes Municipal Water District requirements may also affect planning and utility assumptions.',
    siteFocus:
      'The main slowdowns are HOA approval cycles, gated access, premium procurement, and the operational limits imposed by closely managed communities.',
    prepFocus:
      'Owners should prepare HOA documents, understand access protocols, and align finish expectations early so the schedule is not broken by review-board surprises.',
    projectFocus:
      'Calabasas demand centers on high-end remodels, kitchen and bath modernization, additions, and family-oriented upgrades on large suburban homes.',
    logisticsFocus:
      'We manage Calabasas jobs by sequencing around guard gates, review windows, neighborhood rules, and the higher level of site presentation clients expect.',
    differentiatorFocus:
      'Homeowners here call Red Stag because they want a contractor who can manage the community, the paperwork, and the construction at the same time.',
    relatedCities: ['Hidden Hills', 'Encino', 'Woodland Hills'],
  },
  'Hidden Hills': {
    tier: 1,
    heroImage: '/images/services/custom.jpg',
    heroSubline: 'Ultra-premium estate work planned around equestrian zoning, strict access protocols, private roads, and privacy-first project management.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Hidden Hills is one of the most specialized residential markets in the region because the community expectations extend far beyond the house itself. Equestrian zoning and horse property considerations shape how many sites function, large lot minimums change how projects are planned, and private road maintenance plus strict access protocols affect how crews move through the community.',
    introEnd:
      'It is also an extremely private neighborhood, which means site behavior, security, and discretion are not optional. This is an ultra-premium market where the administrative and interpersonal side of the build carries real weight alongside the construction scope.',
    marketContext:
      'Owners in Hidden Hills are usually not looking for generic remodeling. They are planning estate-level updates, guest structures, large kitchens, major additions, or full-scale transformations on properties that need careful handling. The lots are large enough to support meaningful scope, but that only helps if the contractor understands how privacy, access, and community protocol affect the schedule. The work has to feel controlled and quiet from the outside, even when the scope behind the gate is substantial.',
    processContext:
      'We plan Hidden Hills projects with access, privacy, and operational discipline first. That means confirming route rules, delivery timing, site protection, and any equestrian or property-management considerations before final field sequencing is locked. Once the work starts, the site needs to stay organized, discreet, and tightly supervised because that is part of the standard owners expect here.',
    redStagContext:
      'Red Stag fits Hidden Hills because we know how to run a premium job without making the neighborhood itself a problem. Clients here need a contractor who can coordinate people, deliveries, and details with discipline while still delivering high-end build quality. That is a project-management problem as much as a construction problem, and it is one we are equipped to handle.',
    permitFocus:
      'Hidden Hills work often involves city review layered with community expectations, and equestrian or estate-property conditions can affect how drawings and scope should be framed.',
    siteFocus:
      'Large lot minimums, private roads, horse-property considerations, and strict privacy protocols are the main factors that reshape Hidden Hills projects.',
    prepFocus:
      'Owners should clarify access rules, property management expectations, site constraints, and finish level early so the team can build an accurate operating plan.',
    projectFocus:
      'Most Hidden Hills calls involve estate remodels, large additions, kitchens, guest structures, and premium property upgrades that require quiet, controlled execution.',
    logisticsFocus:
      'We manage Hidden Hills work through tight scheduling, protected staging, discreet communication, and site conduct that respects the privacy of both the client and the community.',
    differentiatorFocus:
      'Hidden Hills homeowners call Red Stag because they need a contractor who can deliver premium work without turning the construction process into a neighborhood issue.',
    relatedCities: ['Calabasas', 'Woodland Hills', 'Encino'],
  },
  'West Hollywood': {
    tier: 4,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Design-forward remodels for dense urban lots, hillside review areas, and strict WeHo planning standards.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'West Hollywood is one of the most design-sensitive urban markets in the region. WeHo Planning Commission design standards and hillside design review affect projects that many homeowners initially think of as straightforward, and the dense lot pattern leaves much less room for sloppy sequencing or oversized assumptions.',
    introEnd:
      'Entertainment-industry clientele is also common here, which means clients often care just as much about site presentation, discretion, and schedule reliability as they do about the finished surfaces. On tight urban lots, the contractor has to be organized from day one.',
    marketContext:
      'The housing stock in West Hollywood ranges from older character properties to modern infill, and both come with constraints. Some owners are protecting architecture. Others are trying to maximize function on a compact site. In both cases, the project succeeds when the design, approvals, and field plan stay aligned. Because the lots are dense, mistakes in access, debris handling, or neighborhood impact are felt immediately. That makes preconstruction discipline more valuable here than in lower-density suburban areas.',
    processContext:
      'We start West Hollywood jobs by clarifying the review path, lot constraints, neighbor exposure, and level of finish control the owner expects. Once those are clear, we build a production plan that respects tight staging and urban sequencing. That is what allows the work to stay clean instead of constantly reacting to conditions that should have been anticipated.',
    redStagContext:
      'Red Stag fits West Hollywood because we can run a design-forward project without losing track of the practical realities of the site. Clients here need direct communication, controlled field operations, and a contractor who knows how to protect momentum on a compact lot. That is a management problem first, and we handle it that way.',
    permitFocus:
      'West Hollywood projects often involve WeHo planning review, and hillside design review can add another layer when the site or scope triggers it.',
    siteFocus:
      'Dense urban lots, close neighbors, limited staging, and design-review expectations are the issues that most often stretch schedules in West Hollywood.',
    prepFocus:
      'Owners should prepare for more conversation around design compatibility, site logistics, and how the work will actually function on a tight property.',
    projectFocus:
      'West Hollywood work usually centers on design-forward remodels, kitchens, additions on compact lots, and selective whole-home upgrades with strong visual expectations.',
    logisticsFocus:
      'We manage West Hollywood jobs by controlling site behavior, debris flow, delivery timing, and the relationship between design intent and practical urban construction.',
    differentiatorFocus:
      'Owners here call Red Stag because they want a contractor who can respect design standards without turning the build into a slow-motion coordination problem.',
    relatedCities: ['Beverly Hills', 'Silver Lake', 'Santa Monica'],
  },
  'Silver Lake': {
    tier: 4,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Design-sensitive remodels for hillside lots, character homes, and high-ROI renovation work in Silver Lake.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Silver Lake is a renovation market where design taste and site difficulty often show up in the same project. Hillside lots are common, and the older Craftsman and Spanish Colonial housing stock means the work has to respect character while still solving real structural, utility, and circulation problems.',
    introEnd:
      'The design review board is active, and the neighborhood continues to reward well-executed renovation with strong ROI. That combination makes Silver Lake less forgiving to generic remodeling than the price point might suggest from the outside.',
    marketContext:
      'Homeowners in Silver Lake are usually trying to balance authenticity with function. They want better kitchens, stronger indoor-outdoor connection, improved structure, or more usable square footage, but they do not want the house to lose the reason it was desirable in the first place. On hillside parcels, retaining, drainage, and access become part of that conversation immediately. On flatter character lots, older construction details and prior piecemeal updates can still complicate the path. Either way, the project needs more thought than a generic city-swap remodel.',
    processContext:
      'We handle Silver Lake by studying both the architecture and the lot. If the property is on a slope, we prioritize drainage, retaining, and access. If the value is in preserving character, we coordinate scope so the updates feel integrated rather than tacked on. That keeps the design honest and the budget grounded in the real conditions of the house.',
    redStagContext:
      'Red Stag fits Silver Lake because we can execute design-sensitive work without ignoring the field realities underneath it. Clients here need a contractor who understands that good taste is not enough if the drainage, structure, or permitting path is wrong. We build from both sides of that equation.',
    permitFocus:
      'Silver Lake projects often run through LADBS with additional design sensitivity layered in through neighborhood expectations and active review processes.',
    siteFocus:
      'Hillside lots, drainage, retaining, and the quirks of older Craftsman and Spanish Colonial homes are the main sources of delay and scope growth.',
    prepFocus:
      'Owners should prepare for a careful study of the lot, the age of the house, and the distinction between preserving character and preserving avoidable problems.',
    projectFocus:
      'Typical Silver Lake work includes kitchens, additions, character-home remodels, hillside stabilization-related upgrades, and high-ROI modernization.',
    logisticsFocus:
      'We manage Silver Lake work by respecting neighborhood context, protecting old-house details worth saving, and solving slope logistics before they hit the field crew.',
    differentiatorFocus:
      'Homeowners here call Red Stag because they want a builder who can protect design character without pretending the site and structure are simple.',
    relatedCities: ['West Hollywood', 'Burbank', 'Studio City'],
  },
  'Burbank': {
    tier: 4,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Family-focused remodels and additions for older Burbank homes near studio corridors and active neighborhood blocks.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Burbank is driven by older housing stock and the rhythm of the entertainment industry. Some properties interact with LADBS jurisdiction overlap or neighboring agency expectations, but the bigger day-to-day reality is that clients often work non-traditional schedules and want a contractor who can communicate clearly without wasting time.',
    introEnd:
      'That matters because many Burbank homes still need system updates, layout work, and code corrections even when the project starts as a simple remodel. Older houses and active family use make preconstruction honesty especially valuable here.',
    marketContext:
      'The Burbank market rewards practical improvement. Homeowners want better kitchens, added bathrooms, family room expansions, and updated houses that work harder without losing the stability of an established neighborhood. The studio economy also creates clients with unusual availability, tighter production windows, or periods where schedule reliability matters even more than average. A contractor who communicates loosely or changes direction constantly is not a good fit for that environment.',
    processContext:
      'We approach Burbank by looking at the age of the house, likely system corrections, and how the owner actually uses the property. If the job touches structure or utilities, we treat that openly from the start. If the challenge is more about sequencing around an unusual client schedule, we solve that in the field plan early. Either way, the project works best when the scope is grounded in what these houses typically need.',
    redStagContext:
      'Red Stag fits Burbank because we combine practical construction management with direct communication. Clients here usually want a contractor who can respect time, protect the house while it is occupied, and keep the work moving without drama. That is exactly how we operate.',
    permitFocus:
      'Burbank work can involve local-review nuances and older-house permit triggers, so we confirm jurisdiction and scope early instead of assuming it behaves like any other Valley job.',
    siteFocus:
      'Older homes, utility upgrades, occupied-family conditions, and constrained client schedules are the main issues that shape Burbank projects.',
    prepFocus:
      'Owners should be ready for realistic discussion about system age, production timing, and the actual disruption level of the work.',
    projectFocus:
      'Burbank demand centers on family remodels, kitchens, baths, additions, and code-correct upgrades to aging houses.',
    logisticsFocus:
      'We manage Burbank jobs by building the schedule around both the house and the client, especially when work hours and communication windows need more structure.',
    differentiatorFocus:
      'Burbank homeowners call Red Stag because they want a contractor who can modernize an older home without turning the project into a constant scheduling scramble.',
    relatedCities: ['Studio City', 'Silver Lake', 'Northridge'],
  },
  'Granada Hills': {
    tier: 5,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Practical remodels, additions, and code-aware upgrades for larger suburban lots in Granada Hills.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Granada Hills is a suburban Valley market where space is often available but the houses need smart updating. Larger lot sizes create flexibility for additions, outdoor work, and ADU conversations, while older housing stock still brings the usual California questions about systems, prior remodel quality, and structural reliability.',
    introEnd:
      'Post-Northridge earthquake retrofit awareness is still part of the local mindset, and homeowners are usually practical about wanting durable work that improves the house without overspending on the wrong scope.',
    marketContext:
      'This is a strong market for families who want to stay in place and improve what they already own. Kitchens, baths, additions, ADUs, and whole-home cleanups all make sense here when they are priced honestly. Because the lots are often more forgiving than Westside or dense urban neighborhoods, owners can get meaningful functional improvement. The tradeoff is that older houses still hide deferred maintenance, old systems, and inconsistent prior work that needs to be accounted for before the budget is treated as real.',
    processContext:
      'We approach Granada Hills by first understanding whether the project is mostly about function, code correction, or added square footage. Then we check the structure and utilities to see what the house will actually support. That keeps the estimate tied to the real building and not just to the owners wish list, which is exactly what protects value in this kind of market.',
    redStagContext:
      'Red Stag works well in Granada Hills because we are comfortable with pragmatic, permit-correct residential work. Homeowners here want direct advice, a realistic budget, and a contractor who can improve the house efficiently without cutting corners on the parts that matter. That is a straightforward fit for our process.',
    permitFocus:
      'Granada Hills projects usually run through LADBS, but structural upgrades, retrofits, and added square footage can expand the permit path quickly.',
    siteFocus:
      'Older housing stock and retrofit awareness are the big factors, more than extreme site constraints or luxury-review layers.',
    prepFocus:
      'Owners should prepare for honest evaluation of structure, utilities, and whether the best value comes from a focused remodel or a broader rework.',
    projectFocus:
      'Granada Hills demand is strongest for family remodels, additions, ADUs, and practical upgrades that add daily function.',
    logisticsFocus:
      'We manage Granada Hills work by keeping the scope disciplined, the permits clean, and the schedule tied to what the house actually needs.',
    differentiatorFocus:
      'Homeowners call Red Stag in Granada Hills because they want real construction guidance instead of a vague promise that everything can be done cheaply and fast.',
    relatedCities: ['Northridge', 'San Fernando', 'Woodland Hills'],
  },
  'Northridge': {
    tier: 5,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Family remodels, additions, and retrofit-aware upgrades for Northridge homes near CSUN and the post-earthquake housing stock.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Northridge still carries the legacy of the 1994 Northridge earthquake in the way homeowners think about construction. Post-1994 retrofit requirements and awareness are still relevant, especially on older housing stock where structural assumptions cannot be taken at face value.',
    introEnd:
      'The neighborhood also functions as a practical SFV suburban market with California State University Northridge adjacency, which affects rental strategy, family use, and the kinds of scope owners are willing to pursue. That creates demand for smart, code-aware work rather than flashy overbuilding.',
    marketContext:
      'Many Northridge owners want more utility from houses that are solid but dated. Kitchens, additions, ADUs, garage conversions, and whole-home updates all show up regularly, especially where families want to stay put or where owners see rental potential tied to CSUN. The challenge is that older systems and structural questions still have to be dealt with honestly. A contractor who treats the house like a cosmetic shell usually creates problems later.',
    processContext:
      'We handle Northridge by looking at retrofit implications, existing systems, and whether the owners goal is family use, multigenerational living, or rental support. Then we sequence the work around the actual code and permit path instead of selling a simplified version of the job. That is what keeps the project grounded and buildable.',
    redStagContext:
      'Red Stag is a good fit for Northridge because we know how to combine practical improvements with serious construction discipline. Homeowners here want the job done correctly, not theatrically. They need a contractor who will talk clearly about retrofit risk, budget, and what the property can support. That is the kind of conversation we have every day.',
    permitFocus:
      'Northridge work generally runs through LADBS, but retrofit-related structural scope and old-house systems can expand review and inspection requirements quickly.',
    siteFocus:
      'The key issues are post-earthquake structural awareness, older housing stock, and project scopes tied to family use or CSUN-driven rental demand.',
    prepFocus:
      'Owners should be ready for structural and utility review before they assume a remodel is purely cosmetic or a conversion is automatically simple.',
    projectFocus:
      'Northridge clients most often pursue practical remodels, additions, ADUs, and house-wide updates that improve function without overcomplicating the property.',
    logisticsFocus:
      'We manage Northridge jobs by keeping scope realistic, permits complete, and construction focused on durable improvements instead of short-term patchwork.',
    differentiatorFocus:
      'Homeowners call Red Stag in Northridge because they want a contractor who will treat structural and code issues as part of the project, not as surprises to be hidden until later.',
    relatedCities: ['Granada Hills', 'San Fernando', 'Woodland Hills'],
  },
  'San Fernando': {
    tier: 5,
    heroImage: '/images/services/adu.jpg',
    heroSubline: 'ADUs, family remodels, and code-correct upgrades built around the City of San Fernando permit office and compact urban lots.',
    serviceLinkSlug: '/adu-contractor-los-angeles',
    serviceLinkLabel: 'ADU construction',
    introStart:
      'San Fernando is a compact city with its own permit path. The City of San Fernando permit office, not LADBS, controls the process, and that matters because local expectations, turnaround, and communication all feel more direct than they do in larger jurisdictions.',
    introEnd:
      'Smaller lot sizes mean every square foot has to work harder, and the significant Spanish-speaking community means bilingual communication is a real differentiator on site. It is also a tight-knit community where referrals travel fast, so site behavior and follow-through matter in a very practical way.',
    marketContext:
      'Most San Fernando homeowners are looking for function, not theater. That often means ADUs, practical additions, kitchens, baths, and code-correct improvements that support multigenerational living or make a compact property more useful. Because the lots are tighter, smart layout and realistic scope are essential. Owners do not benefit from generic luxury language. They benefit from a contractor who can explain what fits, what permits, and what produces the best long-term value on a smaller urban parcel.',
    processContext:
      'We approach San Fernando by studying the lot and the family goal first. If the job is ADU-driven, setbacks, utilities, and site access control the conversation. If it is a remodel, we look at the age of the home and whether code upgrades are likely to become part of the scope. Then we build a direct plan around the city review path and the practical needs of the household.',
    redStagContext:
      'Red Stag fits San Fernando because we keep communication clear and field management disciplined. Bilingual communication matters here, and so does showing up consistently and doing what we say we will do. In a referral-driven community, that is not branding. It is how work gets trusted. We take that seriously.',
    permitFocus:
      'The City of San Fernando permit office controls the review path, so plan comments, scheduling, and communication should be handled with that local process in mind rather than assumed LADBS habits.',
    siteFocus:
      'Smaller lots, tighter access, and the need to maximize every bit of usable space are the biggest factors shaping San Fernando projects.',
    prepFocus:
      'Owners should prepare with clear family-use goals, lot information, and an honest sense of whether the project needs an ADU strategy, a focused remodel, or both.',
    projectFocus:
      'San Fernando demand is strongest for ADUs, practical additions, kitchens, baths, and efficient upgrades that support family living and rental potential.',
    logisticsFocus:
      'We manage San Fernando jobs by communicating clearly, keeping the site respectful, and sequencing work tightly on smaller urban parcels where wasted motion costs real time.',
    differentiatorFocus:
      'Homeowners in San Fernando call Red Stag because they want a contractor who can communicate directly, respect the neighborhood, and build useful space without overselling the process.',
    relatedCities: ['Granada Hills', 'Northridge', 'Burbank'],
  },
  'Tarzana': {
    tier: 4,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Suburban remodels and additions for ranch homes, mid-century properties, and mixed flat-to-hillside lots in Tarzana.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Tarzana sits in the practical center of the Valley remodel market. Ranch homes and mid-century architecture are common, Ventura Blvd proximity shapes access and value in many areas, and the neighborhood mixes flatter properties with hillside-influenced lots that need very different planning.',
    introEnd:
      'That means the same headline scope can behave very differently from one Tarzana block to the next. Some jobs are about efficient modernization. Others need deeper structural and drainage thinking before the design can move forward responsibly.',
    marketContext:
      'Tarzana homeowners usually want better function without unnecessary complication. They are updating older houses, reworking kitchens, adding square footage, or planning family-oriented improvements that make the property perform better over the long term. Because the market is not driven purely by trophy-home premiums, the best value comes from disciplined scope and clear prioritization. That is exactly where honest preconstruction pays off.',
    processContext:
      'We look first at whether the property is flat, sloped, or split in a way that changes structure or access. Then we align the scope to the actual house and the owners goals. On Tarzana projects, that often means deciding whether a focused remodel will solve the problem or whether the house really needs an addition, utility upgrade, or broader layout change. Those are decisions worth making before the budget is locked.',
    redStagContext:
      'Red Stag fits Tarzana because we are comfortable with practical residential work that still demands strong construction discipline. Clients here want a builder who will not overcomplicate the project, but also will not ignore the conditions that can change cost later. That balance is exactly what we provide.',
    permitFocus:
      'Tarzana work usually runs through LADBS, and the permit path changes mostly with structural scope, hillside triggers, and how much older infrastructure the project touches.',
    siteFocus:
      'The mix of flat and hillside properties, plus the realities of older ranch homes, is what shapes Tarzana schedules more than any design-review layer.',
    prepFocus:
      'Owners should be ready to define priorities clearly so the estimate reflects whether the project is a targeted remodel or a bigger rework of the house.',
    projectFocus:
      'Tarzana demand is strongest for kitchens, additions, whole-home updates, and practical family upgrades on established suburban lots.',
    logisticsFocus:
      'We manage Tarzana jobs by matching the field plan to the specific lot condition and by solving scope creep early instead of after demolition.',
    differentiatorFocus:
      'Homeowners call Red Stag in Tarzana because they want a contractor who can keep a practical project organized, permit-correct, and worth the investment.',
    relatedCities: ['Encino', 'Sherman Oaks', 'Woodland Hills'],
  },
  'Woodland Hills': {
    tier: 4,
    heroImage: '/images/services/general.jpg',
    heroSubline: 'Strong remodel, addition, and hillside-aware construction for larger homes around Woodland Hills and the Warner Center edge.',
    serviceLinkSlug: '/general-contractor-los-angeles',
    serviceLinkLabel: 'general contracting project',
    introStart:
      'Woodland Hills is an active remodel market because the housing stock, lot sizes, and buyer expectations all support meaningful improvement. Warner Center proximity shapes traffic, value, and the feel of some areas, while the northern parts of the neighborhood bring hillside conditions that change structure and drainage planning.',
    introEnd:
      'That split makes Woodland Hills a market where you need to understand both suburban scale and site variability. Larger homes can carry larger scope, but that only works if the contractor respects what the lot and the existing structure are actually capable of.',
    marketContext:
      'Most Woodland Hills owners are modernizing houses that have good bones and real room to improve. Kitchens, additions, outdoor living, ADUs, and broader whole-home work all make sense here. The suburban setting often allows more ambitious scope than denser parts of the city, but the challenge is keeping the project disciplined so a large house does not turn into a loose collection of expensive decisions. That is especially true when the property sits closer to hillside conditions or has prior updates of uneven quality.',
    processContext:
      'We approach Woodland Hills by separating lot-driven risk from finish-driven risk. If the property is on a slope, we study drainage, access, and structure early. If the house is simply large and dated, we focus on sequencing, utilities, and how to prioritize the improvements that create the most value. That gives the client a clearer path and a more useful budget.',
    redStagContext:
      'Red Stag works well in Woodland Hills because we can handle both the technical side of bigger residential projects and the practical management needed to keep them on track. Clients here want forward motion, honest numbers, and a contractor who can coordinate a lot of moving parts without losing the thread of the job. That is a core strength for us.',
    permitFocus:
      'Woodland Hills work usually runs through LADBS, but hillside triggers in the north and larger-scope residential projects can materially expand review and inspection needs.',
    siteFocus:
      'The main issues are larger house scale, mixed flat-to-hillside conditions, and keeping broad remodel scopes under control.',
    prepFocus:
      'Owners should prepare for a real discussion about priorities, budget discipline, and whether the propertys lot condition adds structural or drainage costs.',
    projectFocus:
      'Woodland Hills demand is strongest for large remodels, additions, kitchens, ADUs, and outdoor living work on established suburban properties.',
    logisticsFocus:
      'We manage Woodland Hills work by controlling broad residential scopes carefully and solving hillside or access issues before they disrupt the production schedule.',
    differentiatorFocus:
      'Homeowners call Red Stag in Woodland Hills because they want a contractor who can handle a substantial project without letting the scale of the house create confusion.',
    relatedCities: ['Tarzana', 'Calabasas', 'Hidden Hills'],
  },
};

const defaultLocationTemplateConfig = (location: LocationEntry): LocationTemplateConfig => ({
  tier: 4,
  heroImage: '/images/services/general.jpg',
  heroSubline: `Remodels, additions, and design-build work planned around the real permit path and site conditions in ${location.city}.`,
  serviceLinkSlug: '/general-contractor-los-angeles',
  serviceLinkLabel: 'general contracting project',
  introStart: `${location.city} projects require a contractor who understands the local review path, the age of the housing stock, and the difference between a cosmetic scope and a permit-driven build.`,
  introEnd: 'The right plan starts with the real site conditions and the actual neighborhood standard, not with a generic estimate pulled from another city.',
  marketContext:
    `${location.city} homeowners usually call when they need a practical path through remodeling, additions, or broader property upgrades that improve how the house works and protect long-term value.`,
  processContext:
    `Our process in ${location.city} starts with existing conditions, permit triggers, design priorities, and the details that will decide whether the scope stays controlled or expands later.`,
  redStagContext:
    `Red Stag is a strong fit in ${location.city} because we handle planning, permits, and field execution under one team instead of letting the owner manage the gaps.`,
  permitFocus: `${location.city} requires a clear understanding of its permit path, structural triggers, and the review items that can grow once drawings are submitted.`,
  siteFocus: `The biggest risk in ${location.city} is usually assuming the site, utilities, or existing structure are simpler than they actually are.`,
  prepFocus: `Owners in ${location.city} should prepare with a clear scope, realistic finish expectations, and enough field investigation to support a real estimate.`,
  projectFocus: `${location.city} owners usually call for remodels, additions, kitchens, and other projects that need a contractor who can connect design intent to actual construction.`,
  logisticsFocus: `We manage ${location.city} projects by coordinating permits, deliveries, trade sequencing, and site protection early so the schedule stays grounded.`,
  differentiatorFocus: `Homeowners call Red Stag in ${location.city} because they want direct answers, permit-correct work, and a contractor who can actually run the project.`,
  relatedCities: [],
});

const buildLocationIntroParagraphs = (location: LocationEntry, config: LocationTemplateConfig) => {
  return {
    firstParagraph: {
      beforeLink: `${config.introStart} For homeowners planning a `,
      afterLink: `, that local context changes the way we price, design, and permit the work from day one. ${config.introEnd}`,
    },
    remainingParagraphs: [
      `${config.marketContext} In practical terms, that means we spend time understanding how the owner uses the property, what the surrounding neighborhood expects, and whether the scope should be phased or handled as one coordinated build. We do not pitch generic upgrades. We study the house, the parcel, and the review path so the project is grounded in the actual conditions of ${location.city}. That is the difference between a plan that survives first contact with permits and demolition, and one that falls apart as soon as the real work starts.`,
      `${config.processContext} We look at structure, utilities, drainage, access, and consultant needs early because those issues decide budget and schedule more than finish boards do. Once the path is clear, we coordinate drawings, procurement, and sequencing so inspections, deliveries, and field decisions stay aligned. Homeowners in ${location.city} usually benefit from that direct approach because it turns the job into a managed process instead of a series of guesses.`,
      `${config.redStagContext} We have spent 15 years building in this market, and that experience matters most in cities where the site, the permit desk, and the client expectations all apply pressure at the same time. Our role is to solve those variables before they become expensive surprises, then execute the work with the same level of control in the field. That is why clients call us when they want a contractor who can actually carry a project from preconstruction through closeout without handing off accountability halfway through.`,
    ],
  };
};

const buildLocationFaqCategories = (location: LocationEntry, config: LocationTemplateConfig) => {
  return [
    {
      categoryTitle: 'Local Permits and Requirements',
      questions: [
        {
          question: `Which permit office or review path applies to residential work in ${location.city}?`,
          answer: `${config.permitFocus} That matters because the permit desk shapes more than the timeline. It affects how complete the drawing set needs to be, what supporting documents are expected, how expensive corrections become, and whether owners should line up consultant work before they even ask for final pricing. A contractor who knows the local path can tell you early whether the project is likely to move through a straightforward residential review or whether hillside, design, utility, or agency coordination will extend the process. We build that into the plan from the beginning so clients in ${location.city} are not reacting to review comments as if they came out of nowhere. In a market like this, permit strategy is part of construction strategy, not a separate admin task.`,
        },
        {
          question: `What site or neighborhood issues delay projects most often in ${location.city}?`,
          answer: `${config.siteFocus} In most cases, delays happen because the contractor priced the visible scope but ignored the context around it. That can mean retaining and drainage on a sloped parcel, system upgrades in an older home, access restrictions, review-board expectations, or even neighbor sensitivity that changes when noisy work can happen. The point is not that every project is difficult. It is that every city has a pattern, and a builder who knows that pattern can identify likely friction before it slows the field crew. We look for those issues during the site walk and early planning phase so the owner is making decisions with real information instead of optimistic assumptions.`,
        },
        {
          question: `What should homeowners have ready before submitting plans in ${location.city}?`,
          answer: `${config.prepFocus} At minimum, homeowners should know what outcome they actually want, what level of finish they expect, and whether the property has any known site or structural issues that need to be priced honestly. Surveys, consultant reports when required, utility information, HOA documents if applicable, and a realistic allowance strategy all help the process move faster. We also tell owners to decide early whether they are solving a focused problem or opening the door to a broader redesign. In ${location.city}, that distinction matters because review comments, trade coordination, and budget growth all become harder to control once the scope starts drifting after drawings are already in motion.`,
        },
      ],
    },
    {
      categoryTitle: `Working with Red Stag in ${location.city}`,
      questions: [
        {
          question: `What kinds of projects does Red Stag handle most often in ${location.city}?`,
          answer: `${config.projectFocus} We handle the work through a design-build lens, which means the same team that studies the property is responsible for carrying it through permitting, procurement, and field execution. That is valuable in ${location.city} because the right scope often depends on local conditions the owner cannot see on a listing sheet or a Pinterest board. Some clients need a kitchen-first remodel. Others need an ADU strategy, an addition, or a whole-home sequence that corrects several weak points at once. Our job is to tell the difference, price it honestly, and build the right path instead of forcing every property into the same template.`,
        },
        {
          question: `How does Red Stag manage schedule, access, and site behavior in ${location.city}?`,
          answer: `${config.logisticsFocus} That starts before the first day of construction. We coordinate trade flow, deliveries, inspection timing, and protection plans so the site operates with purpose instead of improvisation. In cities with active neighbors, gated access, tight lots, or more visible site standards, that planning is what keeps the project from becoming disruptive or inefficient. Once the work is live, we keep communication direct so the owner knows what was completed, what is next, and what needs attention. We do not treat site management as a side skill. In ${location.city}, it is one of the main reasons a project either feels controlled or feels chaotic.`,
        },
        {
          question: `Why do homeowners in ${location.city} call Red Stag before they finalize scope?`,
          answer: `${config.differentiatorFocus} The earlier we are involved, the easier it is to prevent expensive rework in scope, permitting, and procurement. Owners usually save time when they get clear answers on feasibility, likely approval issues, site risk, and finish budget before they commit to a direction that only looked good in theory. In ${location.city}, that matters because local conditions can reshape the job quickly if no one is paying attention. We would rather pressure-test the plan early than sell a simple story and repair it later with change orders and schedule resets. That direct approach is why clients bring us in before the project gets harder than it needs to be.`,
        },
      ],
    },
  ];
};

const getLocationConfig = (location: LocationEntry) =>
  locationTemplateConfig[location.city] || defaultLocationTemplateConfig(location);

const getLocationServiceTiles = (city: string) => {
  return serviceTileOrder
    .map((serviceName) => matrixData.find((entry) => entry.city === city && entry.service === serviceName))
    .filter((entry): entry is MatrixEntry => Boolean(entry));
};

const getRelatedLocationEntries = (cityNames: string[]) => {
  return cityNames
    .map((city) => locationsData.find((entry) => entry.city === city))
    .filter((entry): entry is LocationEntry => Boolean(entry));
};

const cityReferenceMap: Record<string, string> = {
  'Beverly Hills': 'the independent Beverly Hills permit process, Trousdale hillside lots, and ultra-premium finish expectations',
  'Bel Air': 'gated access, canyon-lot engineering, and private-road coordination',
  'Brentwood': 'the split between flat Brentwood lots and the hills above Sunset',
  'Pacific Palisades': 'geology, coastal material demands, and premium neighborhood standards',
  'Malibu': 'Coastal Commission review, fire-zone hardening, and coastal site logistics',
  'Santa Monica': 'the independent Santa Monica review process, dense older structures, and green-building rules',
  'Manhattan Beach': 'Sand Section lot constraints, Hill Section structure, and salt-air exposure',
  'Studio City': 'LADBS review, older ranch homes south of Ventura, and mid-century properties in the hills',
  'Sherman Oaks': 'older Valley housing stock, generous lots, and Ventura Boulevard adjacency',
  'Encino': 'large mid-century ranch homes, hillside work north of Ventura, and high finish expectations',
  'Calabasas': 'strict HOA review, guard-gate logistics, and premium suburban expectations',
  'Hidden Hills': 'equestrian zoning, privacy protocols, and estate-scale access planning',
  'Tarzana': 'older ranch homes, Ventura corridor access, and mixed flat-to-hillside parcels',
  'Woodland Hills': 'Warner Center adjacency, larger home footprints, and hillside sites to the north',
  'West Hollywood': 'tight urban lots, planning review, and design-sensitive neighborhood standards',
  'Silver Lake': 'hillside lots, character homes, and design-sensitive renovation work',
  'Burbank': 'older family housing stock and studio-adjacent client schedules',
  'Granada Hills': 'larger suburban lots, older homes, and retrofit-aware family remodeling',
  'Northridge': 'post-earthquake structural awareness, older homes, and CSUN-adjacent demand',
  'San Fernando': 'the City of San Fernando permit office, compact lots, and bilingual field communication',
};

const tierMultipliers: Record<1 | 2 | 3 | 4 | 5, number> = {
  1: 1.35,
  2: 1.18,
  3: 1,
  4: 0.82,
  5: 0.72,
};

const serviceProcessNotes: Record<string, string> = {
  'Kitchen Remodel':
    'kitchens in this market usually involve layout studies, appliance planning, cabinet lead times, electrical capacity review, and close coordination between stone, cabinetry, plumbing, and finish carpentry',
  'Bathroom Remodel':
    'bathroom projects here usually hinge on waterproofing, plumbing layout, ventilation, tile procurement, custom glass timing, and getting the inspection sequence right before finishes start',
  'ADU Contractor':
    'ADU work here is driven by feasibility, utility routing, setbacks, fire-separation rules, engineering, and the difference between what looks possible on paper and what the lot can actually support',
  'Custom Home Builder':
    'custom-home work here is shaped by entitlement strategy, engineering, procurement, long lead times, and a production schedule that has to stay coordinated from site prep through finish carpentry',
  'Home Addition':
    'addition projects here are usually defined by setbacks, structural tie-ins, roofing transitions, utility expansion, and how cleanly the new space connects back into the existing house',
  'General Contracting':
    'general-contracting work here means coordinating consultants, permits, trades, procurement, inspections, and owner communication without letting the project break into disconnected handoffs',
  'Hardscape & Concrete':
    'hardscape work here depends on grading, drainage, base preparation, retaining needs, concrete or paver sequencing, and how the exterior scope ties back into the house and site',
  'Fence Company':
    'fence and gate work here is shaped by line verification, frontage rules, post depth, automation, material durability, and how the system performs over time instead of just on install day',
  'Window Replacement':
    'window replacement here depends on Title 24 compliance, field measurement, flashing, stucco and trim repair, noise goals, and deciding whether the opening needs a true full-frame solution',
};

const parseMoneyToken = (value: string) => {
  const match = value.match(/\$([0-9]+(?:\.[0-9]+)?)([KM])?(\+)?/i);

  if (!match) {
    return null;
  }

  const amount = Number.parseFloat(match[1]);
  const unit = (match[2] || '').toUpperCase();
  const plus = Boolean(match[3]);

  let numeric = amount;

  if (unit === 'K') {
    numeric *= 1000;
  } else if (unit === 'M') {
    numeric *= 1000000;
  }

  return { numeric, plus };
};

const formatMoneyValue = (value: number, plus = false) => {
  if (value >= 1000000) {
    const millions = (Math.round((value / 1000000) * 10) / 10).toFixed(1).replace(/\.0$/, '');
    return `$${millions}M${plus ? '+' : ''}`;
  }

  const thousands = Math.round(value / 1000);
  return `$${thousands}K${plus ? '+' : ''}`;
};

const adjustCostRange = (range: string, multiplier: number) => {
  if (!range.includes('$')) {
    return range;
  }

  return range.replace(/\$[0-9]+(?:\.[0-9]+)?[KM]?\+?/gi, (token) => {
    const parsed = parseMoneyToken(token);

    if (!parsed) {
      return token;
    }

    return formatMoneyValue(parsed.numeric * multiplier, parsed.plus);
  });
};

const getMatrixServiceEntry = (serviceName: string) => {
  const serviceSlug = matrixServiceMap[serviceName];
  return servicesData.find((service) => service.slug === serviceSlug);
};

const getMatrixServiceConfig = (serviceName: string) => {
  const serviceEntry = getMatrixServiceEntry(serviceName);
  return serviceEntry ? getServiceConfig(serviceEntry) : null;
};

const getMatrixCostGuide = (serviceName: string, tier: 1 | 2 | 3 | 4 | 5) => {
  const serviceConfig = getMatrixServiceConfig(serviceName);

  if (!serviceConfig) {
    return null;
  }

  const multiplier = tierMultipliers[tier];

  return {
    focused: {
      label: 'Focused Scope',
      costRange: adjustCostRange(serviceConfig.costGuide.basic.costRange, multiplier),
      timeline: serviceConfig.costGuide.basic.timeline,
      includes: serviceConfig.costGuide.basic.whatIsIncluded,
      variables: serviceConfig.costGuide.basic.keyVariables,
    },
    common: {
      label: 'Common Scope',
      costRange: adjustCostRange(serviceConfig.costGuide.mid.costRange, multiplier),
      timeline: serviceConfig.costGuide.mid.timeline,
      includes: serviceConfig.costGuide.mid.whatIsIncluded,
      variables: serviceConfig.costGuide.mid.keyVariables,
    },
    premium: {
      label: 'Premium Scope',
      costRange: adjustCostRange(serviceConfig.costGuide.premium.costRange, multiplier),
      timeline: serviceConfig.costGuide.premium.timeline,
      includes: serviceConfig.costGuide.premium.whatIsIncluded,
      variables: serviceConfig.costGuide.premium.keyVariables,
    },
  };
};

const buildMatrixFaqQuestions = (serviceName: string, city: string) => {
  const baseQuestions: Record<string, string[]> = {
    'Kitchen Remodel': [
      `How much does a kitchen remodel cost in ${city}?`,
      `Do I need permits for a kitchen remodel in ${city}?`,
      `How long does a kitchen remodel take in ${city}?`,
      `What drives kitchen remodel pricing in ${city}?`,
      `How do I choose a kitchen remodel contractor in ${city}?`,
    ],
    'Bathroom Remodel': [
      `How much does a bathroom remodel cost in ${city}?`,
      `Do I need permits for a bathroom remodel in ${city}?`,
      `How long does a bathroom remodel take in ${city}?`,
      `What affects bathroom remodel pricing in ${city}?`,
      `Who should I hire for a bathroom remodel in ${city}?`,
    ],
    'ADU Contractor': [
      `How much does an ADU cost in ${city}?`,
      `Do I need permits to build an ADU in ${city}?`,
      `How long does an ADU project take in ${city}?`,
      `What can I build as an ADU on my lot in ${city}?`,
      `How do I choose an ADU contractor in ${city}?`,
    ],
    'Custom Home Builder': [
      `How much does a custom home cost in ${city}?`,
      `How long does it take to build a custom home in ${city}?`,
      `What permits are required for a custom home in ${city}?`,
      `What drives custom home pricing in ${city}?`,
      `How do I choose a custom home builder in ${city}?`,
    ],
    'Home Addition': [
      `How much does a home addition cost in ${city}?`,
      `Do I need permits for a home addition in ${city}?`,
      `How long does a home addition take in ${city}?`,
      `What affects addition pricing in ${city}?`,
      `How do I choose a home addition contractor in ${city}?`,
    ],
    'General Contracting': [
      `What does a general contractor do in ${city}?`,
      `How much does a general contractor cost in ${city}?`,
      `Do I need a general contractor for a remodel in ${city}?`,
      `How do permits work with a general contractor in ${city}?`,
      `How do I choose a general contractor in ${city}?`,
    ],
    'Hardscape & Concrete': [
      `How much does hardscaping cost in ${city}?`,
      `Do I need permits for hardscape work in ${city}?`,
      `How long does a hardscape project take in ${city}?`,
      `What drives patio and retaining wall pricing in ${city}?`,
      `How do I choose a hardscape contractor in ${city}?`,
    ],
    'Fence Company': [
      `How much does fence installation cost in ${city}?`,
      `Do I need permits for a fence or gate in ${city}?`,
      `How long does fence installation take in ${city}?`,
      `What affects fence and gate pricing in ${city}?`,
      `How do I choose a fence contractor in ${city}?`,
    ],
    'Window Replacement': [
      `How much does window replacement cost in ${city}?`,
      `Do I need permits to replace windows in ${city}?`,
      `How long does window replacement take in ${city}?`,
      `What affects window replacement pricing in ${city}?`,
      `How do I choose a window contractor in ${city}?`,
    ],
  };

  return baseQuestions[serviceName] || [
    `How much does ${serviceName.toLowerCase()} cost in ${city}?`,
    `Do I need permits for ${serviceName.toLowerCase()} in ${city}?`,
    `How long does ${serviceName.toLowerCase()} take in ${city}?`,
    `What affects ${serviceName.toLowerCase()} pricing in ${city}?`,
    `How do I choose a contractor for ${serviceName.toLowerCase()} in ${city}?`,
  ];
};

const getCityPermitTimeline = (city: string) => {
  if (city === 'Malibu') return '6 to 12 months';
  if (city === 'Beverly Hills' || city === 'Bel Air' || city === 'Hidden Hills') return '6 to 10 weeks';
  if (city === 'Santa Monica' || city === 'Manhattan Beach' || city === 'Pacific Palisades') return '6 to 12 weeks';
  if (city === 'San Fernando') return '4 to 8 weeks';
  return '4 to 8 weeks';
};

const getRelatedMatrixPages = (serviceName: string, city: string) => {
  const location = locationsData.find((entry) => entry.city === city);
  const locationConfig = location ? getLocationConfig(location) : null;

  if (!locationConfig) {
    return [];
  }

  return locationConfig.relatedCities
    .map((relatedCity) =>
      matrixData.find((entry) => entry.service === serviceName && entry.city === relatedCity)
    )
    .filter((entry): entry is MatrixEntry => Boolean(entry));
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
    title: buildBlogMetaTitle(blog.title || 'Construction Blog'),
    description: buildBlogMetaDescription(blog.keyword || blog.title || 'building'),
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
    try {
      fileContent = fs.readFileSync(filePath, 'utf8');
    } catch (e) {}

    const datePublished = parseBlogDate(fileContent) || '2026-03-01';
    const dateModified = fs.existsSync(filePath) ? fs.statSync(filePath).mtime.toISOString().split('T')[0] : datePublished;
    const blogServiceLinks = getBlogServiceLinks(`${blog.title} ${blog.keyword} ${fileContent}`);
    const [primaryService, secondaryService] = blogServiceLinks;
    const parsedBlogSections = parseBlogSections(blog, fileContent, blogServiceLinks);
    const articleSections = parsedBlogSections.sections;
    const blogFaqSchema = parsedBlogSections.faqItems.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: parsedBlogSections.faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null;
    const tableOfContents = articleSections.map((section) => ({ id: section.id, title: section.title }));
    const relatedPosts = blogsData
      .filter((entry) => entry.slug !== blog.slug)
      .map((entry) => {
        const candidateLinks = getBlogServiceLinks(`${entry.title} ${entry.keyword}`);
        const candidatePrimary = candidateLinks[0]?.slug || 'general-contractor-los-angeles';
        const keywordToken = (blog.keyword || '').toLowerCase().split(' ')[0];
        const score =
          (candidatePrimary === (primaryService?.slug || 'general-contractor-los-angeles') ? 3 : 0) +
          (keywordToken && entry.keyword.toLowerCase().includes(keywordToken) ? 1 : 0);
        return { ...entry, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    const articleWordCount = countWords(
      [
        blog.title,
        ...articleSections.flatMap((section) => [
          section.title,
          ...section.paragraphs,
          ...(section.subSections?.flatMap((subSection) => [subSection.title, ...subSection.paragraphs]) || []),
        ]),
      ].join(' ')
    );
    const readTimeMinutes = Math.max(1, Math.ceil(articleWordCount / 200));
    const blogCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: blog.title, href: `/${blog.slug}` },
    ];
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: blog.title,
      datePublished,
      dateModified,
      author: {
        '@type': 'Organization',
        name: 'Red Stag Construction',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Red Stag Construction',
      },
      mainEntityOfPage: `${BASE_URL}/${blog.slug}`,
      description: `Read Red Stag Construction's guide to ${blog.keyword || blog.title}.`,
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        {blogFaqSchema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(blogFaqSchema) }}
          />
        ) : null}
        <section className="border-b border-gray-200 bg-warm-white py-4">
          <div className="container mx-auto max-w-6xl px-4">
            <Breadcrumbs crumbs={blogCrumbs} />
          </div>
        </section>
        <div className="bg-warm-white">
          <section className="border-b border-gray-200 bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-red">Red Stag Journal</p>
              <h1 className="mt-4 max-w-4xl text-4xl font-serif font-bold text-text-dark md:text-6xl">
                {blog.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-text-body">
                <span>{readTimeMinutes} min read</span>
                <span className="text-gray-400">/</span>
                <time dateTime={datePublished}>{datePublished}</time>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
              <article className="min-w-0">
                <details className="mb-10 border border-gray-200 bg-white p-5 md:hidden">
                  <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.16em] text-text-dark">
                    Table of Contents
                  </summary>
                  <div className="mt-4 space-y-3">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block text-sm font-medium text-text-body transition-colors hover:text-accent-red"
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </details>

                <div className="space-y-14">
                  {articleSections.map((section, sectionIndex) => (
                    <section key={section.id} id={section.id}>
                      <h2 className="mb-6 text-3xl font-serif font-bold text-text-dark md:text-4xl">
                        {section.title}
                      </h2>
                      <div className="space-y-6 text-lg leading-8 text-text-body">
                        {section.paragraphs.map((paragraph, paragraphIndex) => (
                          <p key={`${section.id}-paragraph-${paragraphIndex}`}>{paragraph}</p>
                        ))}
                        {sectionIndex === 0 && primaryService && secondaryService && (
                          <>
                            <p>
                              If you are already narrowing down scope, start with our{' '}
                              <Link href={primaryService.href} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                                {primaryService.label}
                              </Link>{' '}
                              page. It gives the Los Angeles cost ranges, permit path, and production issues that matter once this topic moves from research into a live job.
                            </p>
                            <p>
                              A lot of owners reading this article also end up comparing adjacent work like{' '}
                              <Link href={secondaryService.href} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                                {secondaryService.label}
                              </Link>{' '}
                              because layout changes, inspection sequencing, and utility upgrades often overlap once the house is already open.
                            </p>
                          </>
                        )}
                        {sectionIndex === 1 && blogServiceLinks[2] && (
                          <p>
                            When the project starts expanding beyond the first idea on paper, our{' '}
                            <Link href={blogServiceLinks[2].href} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                              {blogServiceLinks[2].label}
                            </Link>{' '}
                            page shows how Red Stag handles the larger Los Angeles scope without letting permits, procurement, or occupied-home scheduling get loose.
                          </p>
                        )}
                      </div>

                      {section.subSections && section.subSections.length > 0 && (
                        <div className="mt-10 space-y-10">
                          {section.subSections.map((subSection) => (
                            <div key={`${section.id}-${subSection.title}`}>
                              <h3 className="mb-4 text-2xl font-serif font-bold text-text-dark">
                                {subSection.title}
                              </h3>
                              <div className="space-y-5 text-lg leading-8 text-text-body">
                                {subSection.paragraphs.map((paragraph, paragraphIndex) => (
                                  <p key={`${section.id}-${subSection.title}-${paragraphIndex}`}>{paragraph}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {sectionIndex === 1 && (
                        <div className="mt-10 bg-navy-deep px-8 py-10 text-center">
                          <h3 className="text-3xl font-serif font-bold text-white">
                            Ready to talk through your project with a Los Angeles builder?
                          </h3>
                          <a
                            href={PHONE_HREF}
                            className="mt-5 block text-4xl font-bold text-white transition-opacity hover:opacity-90"
                          >
                            {PHONE_NUMBER}
                          </a>
                          <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center justify-center bg-accent-red px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                          >
                            Get a Free Estimate
                          </Link>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                <section className="mt-16 border-t border-gray-200 pt-12">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="h-0.5 w-14 bg-accent-red"></span>
                    <h2 className="text-3xl font-serif font-bold text-text-dark">Related services</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {blogServiceLinks.slice(0, 2).map((serviceLink) => (
                      <Link
                        key={serviceLink.slug}
                        href={serviceLink.href}
                        className="border border-gray-200 bg-white p-7 transition-colors hover:border-accent-red"
                      >
                        <h3 className="text-2xl font-serif font-bold text-text-dark">{serviceLink.label}</h3>
                        <p className="mt-3 text-base leading-7 text-text-body">
                          See how Red Stag approaches {serviceLink.label.toLowerCase()} work across Greater Los Angeles.
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="mt-16 border-t border-gray-200 pt-12">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="h-0.5 w-14 bg-accent-red"></span>
                    <h2 className="text-3xl font-serif font-bold text-text-dark">Related posts</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/${relatedPost.slug}`}
                        className="border border-gray-200 bg-white p-7 transition-colors hover:border-accent-red"
                      >
                        <h3 className="text-2xl font-serif font-bold text-text-dark">{relatedPost.title}</h3>
                        <p className="mt-3 text-base leading-7 text-text-body">{relatedPost.keyword}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              </article>

              <aside className="mt-14 hidden lg:block lg:mt-0">
                <div className="sticky top-28 space-y-6">
                  <div className="border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-serif font-bold text-text-dark">Table of Contents</h2>
                    <div className="mt-4 space-y-3">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm font-medium text-text-body transition-colors hover:text-accent-red"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-serif font-bold text-text-dark">Related services</h2>
                    <div className="mt-4 space-y-4">
                      {blogServiceLinks.slice(0, 2).map((serviceLink) => (
                        <Link
                          key={`sidebar-${serviceLink.slug}`}
                          href={serviceLink.href}
                          className="block border border-gray-200 bg-warm-white p-4 transition-colors hover:border-accent-red"
                        >
                          <h3 className="text-lg font-serif font-bold text-text-dark">{serviceLink.label}</h3>
                          <p className="mt-2 text-sm leading-6 text-text-body">
                            Review scope, cost, and permit strategy for {serviceLink.label.toLowerCase()} in Los Angeles.
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 bg-white p-6">
                    <h2 className="text-xl font-serif font-bold text-text-dark">Talk to Red Stag</h2>
                    <form
                      action={process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL || '/contact'}
                      method="POST"
                      className="mt-4 space-y-4"
                    >
                      <input type="hidden" name="source" value={blog.slug} />
                      <div>
                        <label htmlFor="blog-sidebar-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-dark">
                          Name
                        </label>
                        <input
                          id="blog-sidebar-name"
                          name="name"
                          type="text"
                          required
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-text-dark focus:border-accent-red focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="blog-sidebar-phone" className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-text-dark">
                          Phone
                        </label>
                        <input
                          id="blog-sidebar-phone"
                          name="phone"
                          type="tel"
                          required
                          className="w-full border border-gray-300 px-4 py-3 text-sm text-text-dark focus:border-accent-red focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-accent-red px-4 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </>
    );
  }

  // --- SERVICE PAGE TEMPLATE ---
  if (service) {
    const config = getServiceConfig(service);
    const introParagraphs = buildServiceIntroduction(service, config);
    const faqCategories = buildServiceFaqCategories(config);
    const serviceAreaLinks = getServiceAreaLinks(config.matrixService);
    const relatedServices = getRelatedServices(config.relatedServices);
    const matchedReview = getRelevantReview(undefined, config.serviceName);
    const serviceH1 =
      service.slug === 'hardscape-contractor-los-angeles'
        ? 'Hardscape Contractor in Los Angeles, CA'
        : service.h1 || `${config.serviceName} in Los Angeles, CA`;
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: config.serviceName,
      serviceType: config.matrixService,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Red Stag Construction',
        url: BASE_URL,
        telephone: '626-652-2303',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3211 Cahuenga Blvd W Ste 207',
          addressLocality: 'Los Angeles',
          addressRegion: 'CA',
          postalCode: '90068',
          addressCountry: 'US',
        },
      },
      areaServed: locationsData.map((entry) => entry.city),
      description: introParagraphs.join(' ').slice(0, 200).trim(),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: config.costGuide.mid.costRange,
          priceCurrency: 'USD',
        },
      },
    };
    const serviceCrumbs = [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/' },
      { label: getServiceCrumb(service.slug).label, href: `/${service.slug}` },
    ];

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <section className="border-b border-gray-200 bg-warm-white py-4">
          <div className="container mx-auto px-4">
            <Breadcrumbs crumbs={serviceCrumbs} />
          </div>
        </section>
        <ParallaxHero 
          imageSrc={config.heroImage}
          imageAlt={serviceH1}
          h1Text={serviceH1}
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

        <ReviewFeatureCard review={matchedReview} />

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
    const config = getLocationConfig(location);
    const introContent = buildLocationIntroParagraphs(location, config);
    const faqCategories = buildLocationFaqCategories(location, config);
    const serviceTiles = getLocationServiceTiles(location.city || '');
    const secondaryServiceLink = getSecondaryLocationServiceLink(location.city || '');
    const matchedReview = getRelevantReview(location.city || '', undefined);
    const tierPricing = tierPricingMap[config.tier];
    const tierCities = locationsData
      .filter((entry) => getLocationConfig(entry).tier === config.tier)
      .map((entry) => entry.city)
      .join(', ');
    const relatedCities = getRelatedLocationEntries(config.relatedCities);
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
          imageSrc={config.heroImage}
          imageAlt={`General Contractor ${location.city || 'Los Angeles'}`}
          h1Text={`General Contractor in ${location.city || 'Los Angeles'}, CA`}
          h2Text={config.heroSubline}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber={PHONE_NUMBER}
        />
        <TrustBar />
        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Building in {location.city || 'Los Angeles'}
              </h2>
            </div>
            <div className="space-y-8 text-lg leading-8 text-text-body">
              <p>
                {introContent.firstParagraph.beforeLink}
                <Link href={config.serviceLinkSlug} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                  {config.serviceLinkLabel}
                </Link>
                {introContent.firstParagraph.afterLink}
              </p>
              <p>
                Homeowners in {location.city || 'Los Angeles'} also ask us to price{' '}
                <Link href={secondaryServiceLink.href} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                  {secondaryServiceLink.label}
                </Link>{' '}
                when the project needs more square footage, stronger resale positioning, or a cleaner path through permits and construction sequencing. That second conversation matters because most houses here are not one-scope properties. They are opportunities to solve circulation, utility upgrades, storage, and long-term value in one coordinated plan instead of forcing the owner to reopen the house again in two years.
              </p>
              {introContent.remainingParagraphs.map((paragraph, index) => (
                <p key={`${location.slug}-intro-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Services we build in {location.city || 'Los Angeles'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTiles.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/${entry.slug}`}
                  className="border border-gray-200 bg-white p-7 transition-colors hover:border-accent-red"
                >
                  <h3 className="text-2xl font-serif font-bold text-text-dark">{entry.service}</h3>
                  <p className="mt-3 text-base leading-7 text-text-body">
                    {locationServiceDescriptions[entry.service]}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Planning a project in {location.city || 'Los Angeles'}?
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                {tierPricing.title}
              </h2>
            </div>
            <div className="border border-gray-200 bg-warm-white p-8">
              <p className="text-lg leading-8 text-text-body">
                {tierPricing.summary} {location.city} sits in this tier alongside {tierCities}. Owners here usually feel the difference in consultant costs, labor rates, finish expectations, and how much site complexity affects the final number.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xl font-serif font-bold text-text-dark">Kitchen Remodel</h3>
                  <p className="mt-3 text-2xl font-bold text-accent-red">{tierPricing.kitchen}</p>
                </div>
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xl font-serif font-bold text-text-dark">Bathroom Remodel</h3>
                  <p className="mt-3 text-2xl font-bold text-accent-red">{tierPricing.bathroom}</p>
                </div>
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xl font-serif font-bold text-text-dark">ADU Construction</h3>
                  <p className="mt-3 text-2xl font-bold text-accent-red">{tierPricing.adu}</p>
                </div>
                <div className="border border-gray-200 bg-white p-6">
                  <h3 className="text-xl font-serif font-bold text-text-dark">Custom Home Build</h3>
                  <p className="mt-3 text-2xl font-bold text-accent-red">{tierPricing.customHome}</p>
                </div>
              </div>
              <p className="mt-8 text-lg leading-8 text-text-body">
                These tier ranges are not generic internet numbers. They reflect the way labor, consultant requirements, permit fees, access, and finish level behave in this part of the Los Angeles market. We use them as an early planning tool, then tighten the budget once the site, approvals, and exact scope are defined.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Questions about building in {location.city || 'Los Angeles'}
              </h2>
            </div>
            <FAQAccordion categories={faqCategories} />
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Nearby areas we serve
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCities.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/${entry.slug}`}
                  className="border border-gray-200 bg-warm-white p-8 transition-colors hover:border-accent-red"
                >
                  <h3 className="text-2xl font-serif font-bold text-text-dark">{entry.city}</h3>
                  <p className="mt-4 text-base leading-7 text-text-body">
                    Explore how Red Stag approaches residential construction work in {entry.city}.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ReviewFeatureCard review={matchedReview} />

        <section className="bg-navy-deep py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Start your {location.city || 'Los Angeles'} project with a contractor who knows the local path.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              We handle planning, permits, scheduling, and field execution with one accountable team.
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
          </div>
        </section>
      </>
    );
  }

  // --- MATRIX PAGE TEMPLATE ---
  if (matrix) {
    const parentLocation = locationsData.find((entry) => entry.city === matrix.city);
    const locationConfig = parentLocation ? getLocationConfig(parentLocation) : null;
    const serviceConfig = getMatrixServiceConfig(matrix.service || '');
    const costGuide = locationConfig ? getMatrixCostGuide(matrix.service || '', locationConfig.tier) : null;
    const relatedMatrixPages = getRelatedMatrixPages(matrix.service || '', matrix.city || '');
    const matrixService = getMatrixServiceCrumb(matrix.service || 'Service');
    const matchedReview = getRelevantReview(matrix.city || '', matrix.service || '');
    const parentLocationHref = parentLocation ? `/${parentLocation.slug}` : '/areas-we-serve';
    const permitTimeline = getCityPermitTimeline(matrix.city || '');
    const cityReference = cityReferenceMap[matrix.city || ''] || `${matrix.city} site conditions and permit requirements`;
    const faqQuestions = buildMatrixFaqQuestions(matrix.service || 'Service', matrix.city || 'Los Angeles');
    const faqCategories = [
      {
        categoryTitle: `Questions about ${matrix.service || 'this service'} in ${matrix.city || 'Los Angeles'}`,
        questions: faqQuestions.map((question) => {
          if (question.includes('What does a general contractor do')) {
            return {
              question,
              answer: `In ${matrix.city}, a general contractor is the party that coordinates the whole residential project: planning, consultant alignment, permit management, trade sequencing, inspections, schedule control, and quality control in the field. ${locationConfig?.permitFocus || `The local permit path in ${matrix.city} matters.`} On a real project that means your contractor is not just hiring subs. They are deciding whether the drawings match the site, whether the scope is priced honestly, whether inspections are scheduled correctly, and whether trades are arriving in the right order. Red Stag handles that work directly because most construction failures in this market do not come from one bad finish. They come from weak coordination. In ${matrix.city}, where site conditions and review requirements can shift the plan quickly, a good general contractor is the person protecting the project from those avoidable failures.`,
            };
          }

          if (question.includes('How much')) {
            return {
              question,
              answer: `The honest answer starts with the city tier and the actual property. In ${matrix.city}, most homeowners planning ${matrix.service?.toLowerCase() || 'this work'} land around ${costGuide?.common.costRange || 'a custom quoted range'}, while smaller focused scopes can start near ${costGuide?.focused.costRange || 'a lower custom range'} and premium work can move toward ${costGuide?.premium.costRange || 'a premium custom range'}. ${locationConfig?.siteFocus || `Local site conditions in ${matrix.city} still drive the number.`} Labor, permits, consultant needs, access, finish level, and how much hidden work shows up after demolition all affect the total. That is why we do not treat online averages as real pricing. We use city-tier planning numbers to set expectations, then tighten the budget once the scope, review path, and site conditions are clear enough to price responsibly.`,
            };
          }

          if (question.includes('permit') || question.includes('permits')) {
            return {
              question,
              answer: `${locationConfig?.permitFocus || `Permitting in ${matrix.city} has to be reviewed before work starts.`} For ${matrix.service?.toLowerCase() || 'this scope'}, permits usually apply whenever the project touches structure, utilities, exterior changes, grading, mechanical systems, or anything else that goes beyond a purely cosmetic refresh. In practical terms, that means homeowners should expect drawings, plan review, and inspection coordination to be part of the schedule. The local process in ${matrix.city} is one of the reasons we front-load planning instead of trying to figure it out after the contract is signed. Skipping permits may lower the number on paper, but it pushes risk directly onto the owner. We build the approval path into the project from day one so the work can close out correctly and hold up when it is time to refinance, sell, or start the next phase.`,
            };
          }

          if (question.includes('How long')) {
            return {
              question,
              answer: `A realistic schedule in ${matrix.city} starts with approvals, not with demolition. For this kind of ${matrix.service?.toLowerCase() || 'project'}, we typically plan around a permit window of about ${permitTimeline} before field work fully starts, then layer the construction schedule on top of that. The production side depends on scope: a focused job moves faster, a permit-heavy or structural scope takes longer, and any project with premium materials or custom fabrication needs lead time built in from the beginning. ${locationConfig?.logisticsFocus || `Local logistics in ${matrix.city} also affect the calendar.`} We give owners a schedule tied to actual milestones like design completion, permit submission, procurement, rough inspections, finish installation, and punch. That is the only way the timeline remains useful once the project is active.`,
            };
          }

          if (question.includes('What can I build')) {
            return {
              question,
              answer: `That answer depends on the lot, setbacks, utilities, access, and how the local review path in ${matrix.city} interprets the scope. With ADU work in particular, homeowners often hear broad state-level rules and assume the lot will support more than it actually can. We start with feasibility because the property still decides what is practical even when the code allows the use category. ${locationConfig?.siteFocus || `Site conditions in ${matrix.city} are still the deciding factor.`} We look at the parcel, the existing structures, utility routes, fire-separation needs, and how expensive it will be to turn an allowed concept into a buildable project. That way the owner gets a real answer instead of a generic yes that collapses as soon as drawings and engineering begin.`,
            };
          }

          if (question.includes('What affects') || question.includes('What drives')) {
            return {
              question,
              answer: `${serviceProcessNotes[matrix.service || ''] || `The scope of ${matrix.service?.toLowerCase() || 'the work'} matters more than the headline label.`} In ${matrix.city}, the biggest pricing and schedule swings usually come from the site itself, the review path, and how much hidden work is sitting behind existing finishes. A project on paper can look identical to one in another city and still cost materially more because the access is tighter, the house is older, the permit office wants more documentation, or the finish level expected by the neighborhood is higher. ${locationConfig?.marketContext || `The local market sets the standard in ${matrix.city}.`} That is why we price these jobs by condition and process, not by a generic square-foot shortcut that ignores what the city and the property are actually asking for.`,
            };
          }

          return {
            question,
            answer: `The right contractor in ${matrix.city} should understand both ${matrix.service?.toLowerCase() || 'the scope'} and the city-specific issues that shape it. That means licensing and insurance, but it also means permit knowledge, scheduling discipline, realistic budgeting, and a field team that can execute without constant handoffs. ${locationConfig?.differentiatorFocus || `In ${matrix.city}, direct project control matters.`} We tell homeowners to ask who is supervising the work, who handles permits and inspections, how hidden conditions are managed, and whether the contractor has actually worked in the same kind of neighborhood and property type before. In a market like ${matrix.city}, the best contractor is rarely the one with the lowest number. It is the one who understands the job well enough to price it honestly and build it without losing control halfway through.`,
          };
        }),
      },
    ];
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
          imageSrc={serviceConfig?.heroImage || `/images/services/${(matrix.service || 'general').toLowerCase().split(' ')[0]}.jpg`}
          imageAlt={`${matrix.service || 'Service'} in ${matrix.city || 'Los Angeles'}`}
          h1Text={`${matrix.service || 'Construction Service'} in ${matrix.city || 'Los Angeles'}, CA`}
          h2Text={`${serviceConfig?.heroSubline || `${matrix.service} planned with real permits, budgets, and production control`}. Built for ${cityReference}.`}
          ctaText="Get a Free Estimate"
          ctaHref="/contact"
          phoneNumber={PHONE_NUMBER}
        />
        <TrustBar />
        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                {matrix.service} work in {matrix.city}
              </h2>
            </div>
            <div className="space-y-8 text-lg leading-8 text-text-body">
              <p>
                {locationConfig?.introStart || `${matrix.city} projects require city-specific planning.`} {locationConfig?.introEnd || ''} As one of the leading general contractors serving {matrix.city} we handle every aspect of your project from permits through completion -{' '}
                <Link href={parentLocationHref} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                  learn more about all our services in {matrix.city}
                </Link>
                . That matters on a {matrix.service?.toLowerCase() || 'construction'} project because local review, lot conditions, and the age or value of the surrounding homes all change how the work should be designed and priced from the beginning.
              </p>
              <p>
                In practical terms, {matrix.service?.toLowerCase() || 'this kind of work'} in {matrix.city} means {serviceProcessNotes[matrix.service || ''] || 'a tightly coordinated construction process'} with city-specific cost and permit pressure layered on top. Most homeowners here plan around {costGuide?.common.costRange || 'a custom quoted mid-range cost'} for a common scope, with focused work starting closer to {costGuide?.focused.costRange || 'a lower custom range'} and premium scopes climbing toward {costGuide?.premium.costRange || 'a premium custom range'}. The timeline is shaped by both construction and review. {locationConfig?.permitFocus || `Permits in ${matrix.city} need to be handled directly.`} {locationConfig?.siteFocus || ''} Those variables are the reason this cannot be treated like a generic city-swap project.
              </p>
              <p>
                Red Stag brings a different level of control to {matrix.service?.toLowerCase() || 'this work'} in {matrix.city}. {serviceConfig?.processDetails || `We handle the project through one accountable design-build team.`} {locationConfig?.redStagContext || ''} We have spent 15 years working across this market, and that experience shows up in how we plan permits, verify site conditions, manage selections, and keep the field crew aligned with the actual scope instead of improvising once the house or lot is open. Clients in and around {matrix.city} call us because they want the schedule, the drawings, and the finished work to stay connected all the way through the project.
              </p>
              <p>
                For a complete overview of our {matrix.service?.toLowerCase() || 'construction'} work across Greater Los Angeles including our full project gallery cost guide and FAQ visit our{' '}
                <Link href={matrixService.href} className="font-semibold text-accent-red underline decoration-accent-red underline-offset-4">
                  {matrixService.label} Los Angeles page
                </Link>
                . That page gives the broader service picture, but the reason you are on this city page is that {matrix.city} changes the planning. Between the permit path, the neighborhood standard, and the way properties in this market behave once demolition or site work starts, the right construction approach here needs its own explanation.
              </p>
              <p>
                The process is straightforward when the planning is honest: consultation, design, permit, and build. We start with a site walk to understand the property, then move into scope definition, early budgeting, and the design-build work needed for drawings and procurement. In {matrix.city}, a realistic permit window is usually about {permitTimeline}, although more complex sites or approvals can stretch that further. Once permits and long-lead items are in motion, we sequence demolition, rough work, inspections, finishes, and punch with the city-specific issues already accounted for instead of reacting to them late. That approach protects the owner from the two biggest problems on residential jobs in this market: schedules built on wishful thinking and budgets built without enough field knowledge.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Ready to start your {matrix.service?.toLowerCase() || 'construction'} project in {matrix.city}?
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
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                {matrix.service} cost guide for {matrix.city}
              </h2>
            </div>
            <div className="overflow-x-auto border border-gray-200">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-navy-deep text-left text-white">
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">Scope</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">{costGuide?.focused.label || 'Focused Scope'}</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">{costGuide?.common.label || 'Common Scope'}</th>
                    <th className="border-b border-white/10 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] font-sans">{costGuide?.premium.label || 'Premium Scope'}</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-sm md:text-base text-text-body">
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">Cost range</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.focused.costRange || 'Contact for Custom Quote'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.common.costRange || 'Contact for Custom Quote'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.premium.costRange || 'Contact for Custom Quote'}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">Timeline</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.focused.timeline || 'Scope dependent'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.common.timeline || 'Scope dependent'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.premium.timeline || 'Scope dependent'}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark border-b border-gray-200">What is included</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.focused.includes || 'Scope dependent'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.common.includes || 'Scope dependent'}</td>
                    <td className="px-5 py-4 border-b border-gray-200">{costGuide?.premium.includes || 'Scope dependent'}</td>
                  </tr>
                  <tr>
                    <td className="bg-warm-white px-5 py-4 font-bold text-text-dark">Key variables</td>
                    <td className="px-5 py-4">{costGuide?.focused.variables || 'Scope dependent'}</td>
                    <td className="px-5 py-4">{costGuide?.common.variables || 'Scope dependent'}</td>
                    <td className="px-5 py-4">{costGuide?.premium.variables || 'Scope dependent'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 text-lg leading-8 text-text-body">
              These figures are city-tier planning numbers for {matrix.city}, not generic Los Angeles averages. They already account for the way local permits, labor, access, finish expectations, and site conditions change the real cost of {matrix.service?.toLowerCase() || 'this work'} in this part of the market.
            </p>
          </div>
        </section>

        <section className="bg-warm-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Questions homeowners ask about {matrix.service?.toLowerCase() || 'this work'} in {matrix.city}
              </h2>
            </div>
            <FAQAccordion categories={faqCategories} />
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-10">
              <span className="w-14 h-0.5 bg-accent-red"></span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">
                Nearby {matrix.service?.toLowerCase() || 'service'} pages
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedMatrixPages.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/${entry.slug}`}
                  className="border border-gray-200 bg-warm-white p-8 transition-colors hover:border-accent-red"
                >
                  <h3 className="text-2xl font-serif font-bold text-text-dark">
                    {entry.service} in {entry.city}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-text-body">
                    Compare how this same service is planned and priced in nearby {entry.city}.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <ReviewFeatureCard review={matchedReview} />

        <section className="bg-navy-deep py-20 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
              Start your {matrix.service?.toLowerCase() || 'construction'} project in {matrix.city} with a contractor who already knows the local path.
            </h2>
            <p className="mt-6 text-lg md:text-xl text-white/80">
              We handle design-build planning, permits, scheduling, and field execution under one accountable team.
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
          </div>
        </section>
      </>
    );
  }
}
