import 'dotenv/config'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'gxu7e27l',
  dataset: 'production',
  apiVersion: '2025-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

function rng() {
  return Math.random().toString(36).slice(2, 9)
}

function blocks(...texts: string[]) {
  return texts.map((text) => ({
    _type: 'block' as const,
    _key: `b${rng()}`,
    style: 'normal',
    markDefs: [] as never[],
    children: [{_type: 'span' as const, _key: `s${rng()}`, marks: [] as never[], text}],
  }))
}

async function upsert(doc: Record<string, unknown>) {
  const result = await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✅ ${result._type} (${result._id})`)
  return result
}

async function seed() {
  console.log('🌱 Seeding SteroidsSupplies content into Sanity…\n')

  // ─── 1. Site Settings ────────────────────────────────────────────────────
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    announcementBar:
      'Fast 48-hour tracked delivery across the UK, USA & Worldwide — same-day priority dispatch available.',
    announcementHref: '/shipping',
    footerWarningText:
      'All products on SteroidsSupplies.co.uk are intended strictly for adults 18 years of age or older only. Anabolic androgenic steroids (AAS) are highly active hormonal compounds that profoundly alter human endocrinology. Use only under direct medical supervision from a licensed clinical professional.',
    footerComplianceText:
      'STEROIDSSUPPLIES operates as a global B2C and B2B wholesale supplier of anabolic androgenic steroids (AAS) and performance compounds. The purchase, import, and possession of AAS are governed by regional laws that vary by country. It is the sole responsibility of the buyer to verify and comply with all applicable local laws before ordering.',
    homepageBadge: 'SteroidsSupplies',
    homepageHeading: 'Buy Steroids Online from the Ultimate Global Performance Source',
    homepageSubheading:
      'Order certified anabolic steroids for sale with institutional-grade quality control and guaranteed 48-hour priority international shipping.',
    homepageNextStepTitle: 'Shop Our Performance Catalog',
    homepageNextStepDescription:
      'Browse certified anabolic steroids, injectable compounds, oral tablets, and PCT supplements for B2C and B2B wholesale buyers across the UK, USA, and worldwide.',
  })

  // ─── 2. Home Page ────────────────────────────────────────────────────────
  await upsert({
    _id: 'ff42da08-7a52-4d28-9f62-016a68ca4167',
    _type: 'homePage',
    heroBadge: 'SteroidsSupplies.co.uk',
    heroHeading: 'Buy Steroids Online from the Ultimate Global Performance Source',
    heroSubheading:
      'Order certified anabolic steroids for sale with institutional-grade quality control and guaranteed 48-hour priority international shipping.',
    heroPrimaryCtaLabel: 'Shop Anabolic Steroids',
    heroPrimaryCtaHref: '/category/injectable-steroids',
    heroSecondaryCtaLabel: 'Apply for Wholesale',
    heroSecondaryCtaHref: '/wholesale',
    trustStripItems: [
      {_type: 'homeTrustItem', _key: 'trust-0', title: 'Pharmaceutical-Grade AAS', iconKey: 'badgeCheck', accent: 'cyan'},
      {_type: 'homeTrustItem', _key: 'trust-1', title: 'Guaranteed 48H Delivery', iconKey: 'truck', accent: 'purple'},
      {_type: 'homeTrustItem', _key: 'trust-2', title: 'COA-Verified Every Batch', iconKey: 'shieldCheck', accent: 'cyan'},
      {_type: 'homeTrustItem', _key: 'trust-3', title: 'B2C & B2B Wholesale', iconKey: 'walletCards', accent: 'purple'},
    ],
    categoriesEyebrow: 'Product Categories',
    categoriesHeading: 'Shop by Category',
    categoriesDescription: 'Browse our complete B2C and wholesale catalog by compound type.',
    categoriesEmptyMessage: 'No categories available yet.',
    authorityEyebrow: 'Institutional QC Supply',
    authorityHeading: 'High-Margin Wholesale Anabolic Steroids for Global B2C and B2B Buyers',
    authorityIntro:
      'When you choose to buy steroids online from SteroidsSupplies, you are bypassing underground black-market guesswork and tapping directly into an institutional-grade supply chain. We specialize in bringing the highest purity anabolic steroids for sale straight to elite athletes, bodybuilders, and wholesale buyers across the UK, USA, and worldwide. Every single batch is third-party HPLC tested, ensuring that when you order anabolic steroids through our encrypted platform, you receive unmatched potency at the best prices on the market.',
    authorityPoints: [
      {_type: 'homeAuthorityPoint', _key: 'ap-0', title: 'HPLC-Verified Purity', description: 'Every compound undergoes strict third-party HPLC analysis guaranteeing absolute purity, correct ester weight, and zero bacterial contamination. COA documentation available on request.', iconKey: 'badgeCheck'},
      {_type: 'homeAuthorityPoint', _key: 'ap-1', title: 'Tiered Wholesale Pricing', description: 'Three progressive bulk discount tiers applied automatically at checkout. No broker fees — manufacturer-direct pricing for gym networks, distributors, and retail labels.', iconKey: 'walletCards'},
      {_type: 'homeAuthorityPoint', _key: 'ap-2', title: '100% Customs Clearance', description: 'All packages are vacuum-sealed, discreetly containerised with accurate customs documentation. We guarantee 100% customs clearance or immediate priority reshipment at zero cost.', iconKey: 'shieldCheck'},
      {_type: 'homeAuthorityPoint', _key: 'ap-3', title: 'Guaranteed 48H Delivery', description: 'Every order ships within 48 hours globally. Same-day priority dispatch available for qualifying orders placed before 12:00 PM.', iconKey: 'truck'},
    ],
    authorityCtaLabel: 'Browse All Products',
    authorityCtaHref: '/products',
    cryptoEyebrow: 'Payment Savings',
    cryptoHeading: 'Save With Crypto Payments',
    cryptoDescription:
      'Pay with cryptocurrency (BTC, ETH, USDT) and save 10% on your order. Revolut and card payments qualify for 5% off. Savings stack with your tier discount.',
    cryptoCtaLabel: 'Apply for Wholesale',
    cryptoCtaHref: '/wholesale',
    deliveryEyebrow: 'Logistics',
    deliveryHeading: 'Guaranteed 48-Hour Priority International Shipping',
    deliveryDescription:
      'All commercial orders are packed using industrial vacuum sealing, discreet non-descript container shapes, and completely anonymous shipping routes. Guaranteed 48-hour tracked delivery globally with same-day priority dispatch available.',
    deliveryCtaLabel: 'View Shipping Policy',
    deliveryCtaHref: '/shipping',
    howToBadge: 'Simple Ordering',
    howToHeading: 'How to Order in 4 Steps',
    howToIntro: 'From catalog browse to delivered compounds in four streamlined steps.',
    howToSteps: [
      {_type: 'homeHowToStep', _key: 'step-0', title: 'Browse Catalog', description: 'Explore our injectable steroids, oral tablets, and PCT supplements to find the right compounds for your cycle or commercial channel.', iconKey: 'search'},
      {_type: 'homeHowToStep', _key: 'step-1', title: 'Submit Order', description: 'Add items to your basket — tiered volume pricing applies automatically — or send your wholesale inquiry via the application form.', iconKey: 'send'},
      {_type: 'homeHowToStep', _key: 'step-2', title: 'Invoice & Payment', description: 'Receive your invoice with crypto (10% off), Revolut/card (5% off), or bank transfer payment options.', iconKey: 'packageCheck'},
      {_type: 'homeHowToStep', _key: 'step-3', title: 'Priority Dispatch', description: 'Orders ship within 48 hours with full tracking. Same-day priority dispatch available for qualifying orders.', iconKey: 'packageCheck'},
    ],
    howToCtaLabel: 'Start Your Order',
    howToCtaHref: '/wholesale',
    wholesaleMidEyebrow: 'Bulk Supply',
    wholesaleMidHeading: 'Bulk Anabolic Steroids for Commercial Distribution',
    wholesaleMidDescription:
      'For gym networks, private labels, and high-volume distributors, our wholesale platform provides direct access to manufacturing volume. Order bulk injectable vials, oral tablet batches, and PCT compound stacks at true manufacturing costs with guaranteed 48-hour priority shipping.',
    wholesaleMidCtaLabel: 'Apply for Wholesale',
    wholesaleMidCtaHref: '/wholesale',
    brandsEyebrow: 'Top Compounds',
    brandsHeading: 'Featured Products',
    brandsEmptyMessage: 'No featured products at this time.',
    testimonialsBadge: 'Verified Buyers',
    testimonialsHeading: 'What Our Buyers Say',
    testimonialsIntro: 'Feedback from verified retail and wholesale customers.',
    blogEyebrow: 'Performance Insights',
    blogHeading: 'Latest from the Blog',
    blogDescription:
      'Stay updated with the latest on anabolic compounds, cycle protocols, compliance guidance, and performance industry updates.',
    blogEmptyMessage: 'No blog posts available yet.',
    blogViewAllLabel: 'View All Posts',
    faqEyebrow: 'Common Questions',
    faqHeading: 'Frequently Asked Questions',
    faqDescription: 'Quick answers on delivery guarantees, HPLC testing, wholesale pricing, and same-day dispatch.',
    faqViewAllLabel: 'View All FAQs',
    complianceShopCtaLabel: 'Shop Products',
    complianceShopCtaHref: '/products',
    complianceContactCtaLabel: 'Contact Us',
    complianceContactCtaHref: '/contact',
    complianceDisclaimerPlain:
      'All products are intended for adults 18+ only. The purchase, import, and possession of AAS are governed by regional laws. Buyers are solely responsible for local legal compliance before ordering.',
    seoTitle: 'Buy Steroids Online | Premium Anabolic Steroids For Sale UK & Global',
    seoDescription:
      'Looking to buy steroids online with guaranteed delivery? SteroidsSupplies delivers certified anabolic steroids for sale. Order premium gear with lightning-fast 48h international shipping and secure checkout today.',
  })

  // ─── 3. Wholesale Page ───────────────────────────────────────────────────
  await upsert({
    _id: 'wholesalePage',
    _type: 'wholesalePage',
    seoTitle: 'Bulk Anabolic Steroids Wholesale | Buy Steroids in Bulk | SteroidsSupplies',
    seoDescription:
      'Access high-volume wholesale anabolic steroids for sale. Bulk pricing on Anavar, Trenbolone, and AAS with guaranteed international delivery and priority 48h shipping.',
    heroBadge: 'B2B Wholesale Program',
    heroHeading: 'Anabolic Steroids Wholesale — Bulk Supply and Automated Tiered Pricing',
    heroSecondaryHeading: 'Wholesale AAS account registration for commercial distributors and gym networks.',
    heroSubhead:
      'At SteroidsSupplies.co.uk, our wholesale platform provides commercial gym owners, private retail labels, and high-volume independent distributors with direct access to unmatched manufacturing volume. Our storefront automatically applies three progressive tiered discount levels directly to listed products based on your total order volume. Buy wholesale gear at true manufacturing costs with guaranteed 48-hour priority shipping.',
    heroTrustLine1: 'COA-Verified · Pharmaceutical-Grade AAS',
    heroTrustLine2: '48H Priority Shipping · Global Distribution',
    whyHeading: 'Why Partner With Us?',
    whyIntro:
      'Our wholesale partnership model is built for distributors and retailers who need verified compound quality, competitive pricing, and reliable logistics at scale.',
    benefits: [
      {_type: 'wholesaleBenefit', _key: 'ben-0', title: 'Manufacturer-Direct Pricing', description: 'We eliminate secondary broker fees, passing deep capital savings straight to your bottom line — automatic tiered discounts require no registration or approval delays.', iconKey: 'badgePercent'},
      {_type: 'wholesaleBenefit', _key: 'ben-1', title: 'HPLC-Certified Stock', description: 'Every batch is accompanied by third-party Certificate of Analysis (COA) documentation covering potency, purity, and bacterial safety for your downstream retail customers.', iconKey: 'shieldCheck'},
      {_type: 'wholesaleBenefit', _key: 'ben-2', title: 'Dedicated Account Management', description: 'Every verified commercial account is assigned a dedicated B2B manager to oversee orders from placement to final delivery confirmation.', iconKey: 'headphones'},
    ],
    howHeading: 'How It Works',
    howIntro: 'Four steps from catalog browse to delivered compounds.',
    steps: [
      {_type: 'wholesaleStep', _key: 'ws-0', title: 'Browse', description: 'Explore our injectable steroids, oral tablets, and PCT supplement categories to find the right compounds for your distribution channel.', iconKey: 'search'},
      {_type: 'wholesaleStep', _key: 'ws-1', title: 'Submit', description: 'Send your business details, product interests, and estimated volume via the wholesale application form below.', iconKey: 'send'},
      {_type: 'wholesaleStep', _key: 'ws-2', title: 'Invoice', description: 'Receive a formal quote with payment options (crypto 10% off, Revolut/card 5% off, or bank transfer/SEPA).', iconKey: 'fileText'},
      {_type: 'wholesaleStep', _key: 'ws-3', title: 'Ship', description: 'Orders ship within 48 hours with full tracking and 100% customs clearance guarantee on all international shipments.', iconKey: 'truck'},
    ],
    discountHeading: 'Discount Structure',
    discountIntro: 'Savings stack with your volume tier — your invoice reflects the method you confirm at checkout.',
    paymentCardTitle: 'Payment Method Savings',
    paymentCardDescription: 'Applied to qualifying orders at invoice.',
    cryptoRowLabel: 'Cryptocurrency (BTC, ETH, USDT)',
    cryptoDiscountLabel: '10% off',
    revolutRowLabel: 'Revolut / Card',
    revolutDiscountLabel: '5% off',
    volumeCardTitle: 'Volume Tiers',
    volumeCardDescription: 'Illustrative brackets — exact pricing is quote-based.',
    volumeTiers: [
      {_type: 'volumeTier', _key: 'vt-0', tier: '£500 – £1,500', note: 'Entry level — full compound mix'},
      {_type: 'volumeTier', _key: 'vt-1', tier: '£1,500 – £5,000', note: 'Volume pricing on high-demand SKUs'},
      {_type: 'volumeTier', _key: 'vt-2', tier: '£5,000 – £10,000', note: 'Priority allocation and express routing'},
      {_type: 'volumeTier', _key: 'vt-3', tier: '£10,000+', note: 'Custom brackets — contact your account manager'},
    ],
    formHeading: 'Apply for Wholesale Access',
    formIntro: 'Prefer a dedicated page? Use the',
    wholesaleRequestPage: {
      badge: 'Wholesale Application',
      heading: 'B2B Wholesale Application',
      intro: 'Complete the form and our team will follow up with pricing and onboarding steps within one business day.',
      thankYouHeading: 'Thanks, your inquiry is in.',
      thankYouIntro:
        'Our B2B team will review your request and typically reply within one business day with compound pricing and onboarding steps.',
      thankYouNextStepsTitle: 'Next Steps',
      thankYouUrgentHelpTitle: 'Need Urgent Help?',
      thankYouUrgentHelpBody: 'Email us and reference your business name.',
      supportEmail: 'sales@steroidssupplies.co.uk',
    },
    testimonialsHeading: 'Wholesale Buyer Testimonials',
    testimonialsIntro: 'Feedback from verified wholesale partners.',
    faqHeading: 'Wholesale FAQ',
    faqIntro: 'Quick answers on volume pricing, delivery, payment methods, and customs clearance.',
    faqs: [
      {_type: 'wholesaleFaq', _key: 'wf-0', question: 'Do I need a separate wholesale account to access bulk pricing?', answer: 'No. Our platform applies automated tiered volume discounts directly at checkout based on the quantity of items in your basket, giving you instant wholesale access without approval delays.'},
      {_type: 'wholesaleFaq', _key: 'wf-1', question: 'What happens if a large wholesale order is held at customs?', answer: 'We track every bulk consignment meticulously. In the rare event that an international wholesale package is held or compromised at customs, our 100% delivery guarantee triggers an immediate priority reshipment at zero cost to your business.'},
      {_type: 'wholesaleFaq', _key: 'wf-2', question: 'What are the minimum order thresholds for wholesale pricing?', answer: 'Volume discounts begin at our tier-two level. Adding bulk quantities of Anavar, Trenbolone, injectable vials, or mixed performance lines automatically reduces the individual unit price in real time at checkout.'},
      {_type: 'wholesaleFaq', _key: 'wf-3', question: 'Can we arrange custom logistics for multi-country distribution?', answer: 'Absolutely. Our international logistics team excels at managing complex multi-destination split shipments for commercial distribution networks. Contact your dedicated account manager to establish a custom rolling delivery schedule.'},
    ],
  })

  // ─── 4. About Page ───────────────────────────────────────────────────────
  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    seoTitle: 'About SteroidsSupplies | Certified Global Performance Compound Supplier',
    seoDescription:
      'Read the history and operational standards of SteroidsSupplies. We provide premium-grade anabolic steroids to retail and wholesale markets globally with HPLC-verified purity and guaranteed 48h delivery.',
    pageHeading: 'About SteroidsSupplies — Redefining Anabolic Quality Standards',
    introLead:
      'The technology, chemistry, and international logistics driving our premium performance compound distribution network.',
    storyHeading: 'Our Story',
    storyBody: blocks(
      'Founded by an elite collective of veteran organic chemists and international logistics experts, SteroidsSupplies was built to solve a critical market vulnerability: the complete lack of verifiable purity and delivery transparency in the performance supplement industry.',
      'We maintain state-of-the-art laboratory facilities utilizing HPLC testing protocols to guarantee every compound meets exact pharmaceutical standards. We do not believe performance enhancers should be sourced through unverified avenues.',
    ),
    missionHeading: 'Our Mission: Institutional Quality, Global Reach',
    missionBody: blocks(
      'Our operation spans the entire globe, seamlessly servicing both individual retail consumers and high-volume commercial wholesale distribution networks. By maintaining absolute control over our manufacturing, storage, and discrete global shipping routes, we provide our clients with the fastest, safest, and most cost-effective path to acquiring premium performance compounds on the market today.',
      'Every compound leaves our facility with a Certificate of Analysis (COA) from an independent ISO-certified laboratory, confirming exact potency, purity, and zero heavy metal or solvent contamination.',
    ),
    teamHeading: 'Operations & Fulfillment',
    teamBody: blocks(
      'We operate fully optimized fulfillment infrastructure that guarantees 48-hour priority shipping on all standard orders, alongside same-day priority dispatch for qualifying high-volume accounts.',
    ),
    stats: [
      {_key: 'stat-0', value: '48h', label: 'Guaranteed Delivery'},
      {_key: 'stat-1', value: '100%', label: 'Customs Clearance Rate'},
      {_key: 'stat-2', value: 'HPLC', label: 'Lab-Verified Purity'},
      {_key: 'stat-3', value: 'Global', label: 'Distribution Network'},
    ],
    complianceHeading: 'Built on Two Inflexible Core Guarantees',
    complianceIntro: 'Every product and shipment is backed by our uncompromising quality and fulfillment commitments.',
    compliancePoints: [
      {_key: 'cp-0', title: 'Pharmaceutical-Grade Purity', description: 'We source only compounds verified by third-party HPLC analysis confirming exact ester dosing, zero heavy metals, zero residual solvents, and zero bacterial contamination. COA documentation is available for every batch.'},
      {_key: 'cp-1', title: 'Guaranteed 48H Fulfillment', description: 'In the fast-moving performance market, supply delays cost results. We guarantee 48-hour tracked delivery on all standard orders with same-day priority dispatch available for high-volume qualifying accounts.'},
    ],
    ctaLabel: 'Apply for Wholesale',
    ctaHref: '/wholesale',
  })

  // ─── 5. Contact Page ─────────────────────────────────────────────────────
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    seoTitle: 'Contact SteroidsSupplies | 24/7 Retail & Wholesale Support',
    seoDescription:
      'Reach out to SteroidsSupplies. Connect with our dedicated team for retail orders, custom wholesale tiers, bulk compound quotes, and global freight coordination.',
    pageHeading: 'Contact SteroidsSupplies — Direct Retail & Wholesale Support',
    introLead:
      'Our dedicated team of logistics experts and account managers is online 24/7 to facilitate your procurement needs.',
    formHeading: 'Send Us a Message',
    formIntro: 'Complete the form below and our team will respond within 12 hours.',
    nameFieldLabel: 'Full Name',
    emailFieldLabel: 'Business or Personal Email',
    subjectFieldLabel: 'Subject',
    messageFieldLabel: 'Message',
    submitButtonLabel: 'Send Message',
    subjectOptions: [
      {_key: 'sub-0', value: 'wholesale-inquiry', label: 'Wholesale Inquiry'},
      {_key: 'sub-1', value: 'order-support', label: 'Order Support'},
      {_key: 'sub-2', value: 'custom-quote', label: 'Custom Volume Quote'},
      {_key: 'sub-3', value: 'compound-advice', label: 'Compound Advice'},
      {_key: 'sub-4', value: 'general', label: 'General Question'},
    ],
    successTitle: 'Message Sent',
    successMessage:
      'Thanks for contacting SteroidsSupplies. A team member will follow up within 2 hours.',
    detailsHeading: 'Connect With Our Sales & Support Team',
    contactEmail: 'sales@steroidssupplies.co.uk',
    contactPhone: '+44 800 STEROIDS',
    businessHours: 'Mon–Sun, 24/7 support availability',
    responsePromise: 'All customer inquiries are handled with absolute confidentiality and resolved within a maximum of 12 hours.',
    paymentsNote:
      'For established commercial accounts and qualifying high-volume orders placed before 12:00 PM, same-day priority dispatch is available.',
  })

  // ─── 6. Compliance Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'compliancePage',
    _type: 'compliancePage',
    title: 'Legality, Jurisdictional Compliance, and Chemical Safety Documentation',
    description:
      'Crucial legal frameworks and safety disclosures regarding the purchase, possession, and application of anabolic androgenic steroids (AAS).',
    sections: [
      {
        _type: 'legalSection',
        _key: 'cs-0',
        title: 'Overview',
        paragraphs: [
          'The purchase, import, and possession of anabolic androgenic steroids (AAS) are governed by distinct regional, domestic, and international laws that vary significantly from one country to another.',
          'It is the sole responsibility of the individual customer or wholesale purchaser to understand, evaluate, and adhere to the precise legal statutes, import restrictions, and prescription requirements enforced within their own country or local jurisdiction before initiating an order through our storefront. SteroidsSupplies assumes zero legal liability for cross-border customs items that run contrary to localised laws.',
        ],
      },
      {
        _type: 'legalSection',
        _key: 'cs-1',
        title: 'Mandatory Medical Warning & Accidental Misuse Notice',
        paragraphs: [
          'Anabolic steroids are highly active, potent hormonal compounds that profoundly alter human endocrinology. Unsupervised, excessive, or unverified administration can result in severe and potentially permanent health complications.',
          'These include cardiovascular strain, left ventricular hypertrophy, severe hepatic toxicity, profound suppression of the natural hypothalamic-pituitary-gonadal axis (HPGA), dyslipidemia, and psychiatric alterations.',
          'All materials, chemical profiles, and descriptions hosted across this domain are intended strictly for educational, research, and informational contexts. They do not constitute professional medical advice, diagnosis, or treatment protocols. Never implement any compound without direct medical supervision from an independent, licensed clinical professional.',
        ],
      },
      {
        _type: 'legalSection',
        _key: 'cs-2',
        title: 'Age Restriction & Buyer Eligibility',
        bullets: [
          'Age Verification: All products are strictly for adults aged 18 years or older. We do not sell to minors under any circumstances.',
          'AAS Jurisdictional Compliance: Buyers are responsible for verifying that the purchase, import, and possession of AAS is legal within their jurisdiction before placing an order.',
          'International Shipments: International buyers are responsible for knowing and adhering to their local customs regulations. We package all cross-border cargo in compliant, discreet master cases with accurate customs documentation.',
        ],
      },
    ],
  })

  // ─── 7. Legal Content ────────────────────────────────────────────────────
  await upsert({
    _id: 'legalContent',
    _type: 'legalContent',
    supportEmail: 'support@steroidssupplies.co.uk',
    pactActNotice:
      'The purchase, import, and possession of anabolic androgenic steroids (AAS) are governed by regional laws that vary significantly by jurisdiction. SteroidsSupplies operates as a global supplier. It is the sole responsibility of the buyer to understand and comply with all applicable local laws, import restrictions, and prescription requirements before placing an order.',
    nicotineWarning:
      'For adults 18 years of age or older only. Anabolic androgenic steroids (AAS) are highly active hormonal compounds. Use only under direct medical supervision from a licensed clinical professional. Not for sale to minors.',
    thcWarning:
      'Anabolic steroids (AAS) are controlled or regulated substances in many jurisdictions. Buyers are solely responsible for verifying local legality before ordering. SteroidsSupplies assumes no liability for buyer non-compliance with regional AAS laws.',
    fdaDisclaimer:
      'All materials, chemical profiles, and product descriptions on this site are intended strictly for educational, research, and informational contexts. They do not constitute professional medical advice, diagnosis, or treatment protocols. These products have not been evaluated by any regulatory authority for therapeutic use. Never implement any compound without direct medical supervision from a licensed clinical professional.',
    privacyTitle: 'Privacy Policy',
    privacyDescription: 'SteroidsSupplies Privacy Policy — How we collect, use, and protect your personal information.',
    privacySections: [
      {_type: 'legalSection', _key: 'prv-0', title: '1. Introduction', paragraphs: ['SteroidsSupplies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.']},
      {_type: 'legalSection', _key: 'prv-1', title: '2. Information We Collect', paragraphs: ['We collect information you provide directly to us, such as:'], bullets: ['Name and contact information (email, phone, address)', 'Business or personal verification information', 'Payment and billing information', 'Order and shipping history', 'Communication preferences']},
      {_type: 'legalSection', _key: 'prv-2', title: '3. How We Use Your Information', paragraphs: ['We use collected information to:'], bullets: ['Process and fulfil your orders', 'Verify your age and eligibility', 'Send transactional emails (order confirmations, shipment updates)', 'Improve our website and services', 'Comply with applicable laws and regulations']},
      {_type: 'legalSection', _key: 'prv-3', title: '4. Data Security', paragraphs: ['We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. All transactions are encrypted via SSL/TLS.']},
      {_type: 'legalSection', _key: 'prv-4', title: '5. Contact Us', paragraphs: ['If you have questions about this Privacy Policy, please contact us at support@steroidssupplies.co.uk.']},
    ],
    termsTitle: 'Terms of Service',
    termsDescription: 'SteroidsSupplies Terms of Service — Read our complete terms and conditions for purchasing and using our site.',
    termsSections: [
      {_type: 'legalSection', _key: 'trm-0', title: '1. Acceptance of Terms', paragraphs: ['By accessing and using this website, you accept and agree to be bound by these terms. This platform is for buyers aged 18 and over only.']},
      {_type: 'legalSection', _key: 'trm-1', title: '2. Eligibility', paragraphs: ['You must be 18 years or older to purchase products from SteroidsSupplies. All buyers confirm they have verified local AAS laws and that their purchase is lawful within their jurisdiction.']},
      {_type: 'legalSection', _key: 'trm-2', title: '3. Buyer Compliance Responsibility', paragraphs: ['The purchase, import, and possession of AAS are governed by regional laws. Buyers are solely responsible for compliance with local, national, and international laws in their jurisdiction. SteroidsSupplies assumes no legal liability for buyer non-compliance.']},
      {_type: 'legalSection', _key: 'trm-3', title: '4. Ordering & Payment', paragraphs: ['By placing an order, you confirm that you are of legal age and that your purchase is lawful in your jurisdiction. We reserve the right to refuse or cancel any order at our sole discretion.']},
      {_type: 'legalSection', _key: 'trm-4', title: '5. Shipping & Delivery', paragraphs: ['Standard orders are dispatched with guaranteed 48-hour priority international shipping. All shipments are vacuum-sealed and discreetly packaged. A 100% customs clearance guarantee applies — reshipment at no cost in the rare event of customs interference.']},
      {_type: 'legalSection', _key: 'trm-5', title: '6. Contact & Disputes', paragraphs: ['For any questions or disputes regarding these terms, please contact us at support@steroidssupplies.co.uk.']},
    ],
    refundsTitle: 'Refund Policy',
    refundsDescription: 'SteroidsSupplies Refund Policy — Learn about our return and refund procedures.',
    refundsSections: [
      {_type: 'legalSection', _key: 'ref-0', title: 'Our Refund Policy', paragraphs: ['At SteroidsSupplies, we stand behind the quality of every compound we ship. Please read our refund policy carefully before placing an order.']},
      {_type: 'legalSection', _key: 'ref-1', title: '1. Eligibility for Returns', paragraphs: ['Items may be eligible for replacement or refund if:'], bullets: ['The item is damaged, defective, or incorrectly dispensed upon arrival', 'We made an error in your order', 'The package was not delivered after the customs clearance guarantee period']},
      {_type: 'legalSection', _key: 'ref-2', title: '2. Customs Clearance Guarantee', paragraphs: ['In the rare event that a package is held or seized at customs, our guarantee triggers an immediate priority reshipment at zero cost to you. Contact us with your order reference.']},
      {_type: 'legalSection', _key: 'ref-3', title: '3. Defective Items', paragraphs: ['If you receive a defective or damaged product, contact us within 7 days of delivery with photos or video evidence. We will replace the item at no cost or issue a full refund within 7–10 business days.']},
    ],
    agePolicyTitle: 'Mandatory Medical Warning & Safety Notices',
    agePolicyDescription: 'Read our mandatory safety disclaimers, age verification requirements, and chemical compound warnings.',
    agePolicySections: [
      {_type: 'legalSection', _key: 'age-0', title: 'Mandatory Age Restriction', paragraphs: ['All products available on SteroidsSupplies.co.uk are strictly for adults 18 years of age or older only. We do not sell to minors under any circumstances. Age verification is enforced at the point of purchase.']},
      {_type: 'legalSection', _key: 'age-1', title: 'Medical Safety Warning', paragraphs: ['Anabolic androgenic steroids (AAS) are highly active hormonal compounds that profoundly alter human endocrinology. Unsupervised use can result in severe and potentially permanent health complications including cardiovascular strain, left ventricular hypertrophy, hepatic toxicity, suppression of the hypothalamic-pituitary-gonadal axis (HPGA), dyslipidemia, and psychiatric alterations.', 'Never use any compound without direct medical supervision from a licensed clinical professional.']},
      {_type: 'legalSection', _key: 'age-2', title: 'Jurisdictional Compliance Responsibility', paragraphs: ['The purchase, import, and possession of AAS are controlled or regulated in many jurisdictions. It is the sole responsibility of the buyer to verify and comply with all applicable laws before placing an order. SteroidsSupplies assumes no legal liability for buyer non-compliance with regional AAS regulations.']},
    ],
  })

  // ─── 8. Categories ───────────────────────────────────────────────────────
  await upsert({
    _id: 'category-injectable-steroids',
    _type: 'category',
    name: 'Injectable Steroids',
    slug: {_type: 'slug', current: 'injectable-steroids'},
    group: 'Injectable Steroids',
    shortDescription:
      'Order pharmaceutical-grade injectable anabolic steroids including Trenbolone, Testosterone, and Boldenone vials with guaranteed 48h delivery.',
    seoTitle: 'Buy Injectable Steroids Online | Premium AAS Vials | SteroidsSupplies',
    seoDescription:
      'Buy injectable steroids online at wholesale prices. Pharmaceutical-grade Trenbolone, Testosterone, Nandrolone, and Boldenone vials. HPLC-verified. Guaranteed 48h international delivery.',
    categoryHeroEyebrow: 'Injectable Steroids',
    categoryHeroHeading: 'Buy Injectable Steroids Online — Pharmaceutical-Grade AAS Vials',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy pharmaceutical-grade injectable steroids online at direct wholesale prices. HPLC-verified potency with guaranteed 48-hour international delivery.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'Injectable Steroids',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling Injectable Steroids',
    categoryBestsellersDescription: 'Our most in-demand injectable AAS vials for retail and wholesale buyers.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about injectable steroid orders, dosing, and delivery.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other compound categories.',
    isActive: true,
    navOrder: 1,
    showInHeader: true,
  })

  await upsert({
    _id: 'category-oral-steroids',
    _type: 'category',
    name: 'Oral Steroids',
    slug: {_type: 'slug', current: 'oral-steroids'},
    group: 'Oral Steroids',
    shortDescription:
      'Order premium oral anabolic steroids including Anavar (Oxandrolone), Dianabol, and Winstrol tablets with HPLC-verified purity and 48h delivery.',
    seoTitle: 'Buy Oral Steroids Online | Anavar, Dianabol & Winstrol Tablets | SteroidsSupplies',
    seoDescription:
      'Buy oral steroids online at wholesale prices. Anavar (Oxandrolone), Dianabol (Methandrostenolone), Winstrol, and more. COA-verified. Guaranteed 48h international delivery.',
    categoryHeroEyebrow: 'Oral Steroids',
    categoryHeroHeading: 'Buy Oral Steroids Online — Premium Anavar, Dianabol & Winstrol Tablets',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy pharmaceutical-grade oral steroids online at direct wholesale prices. HPLC-verified purity with guaranteed 48-hour international delivery.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'Oral Steroids',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling Oral Steroids',
    categoryBestsellersDescription: 'Our most in-demand oral AAS tablets for retail and wholesale buyers.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about oral steroid orders, dosing protocols, and delivery.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other compound categories.',
    isActive: true,
    navOrder: 2,
    showInHeader: true,
  })

  await upsert({
    _id: 'category-pct-supplements',
    _type: 'category',
    name: 'PCT Supplements',
    slug: {_type: 'slug', current: 'pct-supplements'},
    group: 'PCT Supplements',
    shortDescription:
      'Order post-cycle therapy (PCT) supplements including Nolvadex, Clomid, and Aromasin to restore natural hormone production after an AAS cycle.',
    seoTitle: 'PCT Supplements | Post-Cycle Therapy | Nolvadex, Clomid & Aromasin | SteroidsSupplies',
    seoDescription:
      'Buy PCT supplements online. Nolvadex (Tamoxifen), Clomid (Clomiphene), Aromasin (Exemestane), and HCG for complete post-cycle recovery. Guaranteed 48h international delivery.',
    categoryHeroEyebrow: 'PCT Supplements',
    categoryHeroHeading: 'Post-Cycle Therapy Supplements — Restore, Recover, Rebalance',
    categoryHeroPrimaryCtaLabel: 'Apply for Wholesale',
    categoryHeroSecondaryCtaLabel: 'View All Products',
    categoryHeroFallbackDescription:
      'Buy pharmaceutical-grade PCT supplements to restore natural hormone production after an AAS cycle. Guaranteed 48-hour international delivery.',
    categoryFilterLabel: 'Filter Products',
    categoryFilterViewAllLabel: 'View All',
    categoryFilterLoadingMessage: 'Loading products…',
    categoryProductsHeadingTemplate: 'PCT Supplements',
    categoryProductsEmptyMessage: 'No products available yet. Contact us for custom bulk orders.',
    categoryBestsellersEyebrow: 'Top Sellers',
    categoryBestsellersHeading: 'Best-Selling PCT Supplements',
    categoryBestsellersDescription: 'Our most in-demand PCT compounds for complete post-cycle recovery.',
    categoryBestsellersViewAllLabel: 'View All',
    categoryFaqHeading: 'Frequently Asked Questions',
    categoryFaqDescription: 'Quick answers about PCT protocols, compounds, and recovery timelines.',
    categoryFaqEmptyMessage: 'No FAQs available yet.',
    categoryCrossLinksHeading: 'Also Available',
    categoryCrossLinksDescription: 'Explore our other compound categories.',
    isActive: true,
    navOrder: 3,
    showInHeader: true,
  })

  // ─── 9. FAQ Items ────────────────────────────────────────────────────────
  const faqs = [
    {
      _id: 'faq-guaranteed-delivery',
      _type: 'faqItem',
      question: 'Where can I buy anabolic steroids online with a guaranteed delivery?',
      answer: blocks(
        'You can buy certified anabolic steroids online safely right here at SteroidsSupplies. We provide an ironclad delivery guarantee on all orders, utilising advanced routing and discrete packaging to ensure your package arrives within 48 hours globally. In the rare event of customs interference, we initiate an immediate priority reshipment at zero cost.',
      ),
      category: 'General',
      ctaLabel: 'Browse catalog',
      ctaHref: '/products',
      order: 10,
      isActive: true,
    },
    {
      _id: 'faq-hplc-testing',
      _type: 'faqItem',
      question: 'Are your anabolic steroids verified by laboratory testing?',
      answer: blocks(
        'Yes. Every product undergoes strict third-party HPLC analysis guaranteeing absolute purity, correct ester weight, and zero bacterial contamination. Certificate of Analysis (COA) documentation is available on request prior to placing your order.',
      ),
      category: 'Products',
      ctaLabel: 'Shop products',
      ctaHref: '/products',
      order: 20,
      isActive: true,
    },
    {
      _id: 'faq-same-day-dispatch',
      _type: 'faqItem',
      question: 'Do you offer same-day priority dispatch for international orders?',
      answer: blocks(
        'Yes. Orders placed before 12:00 PM are picked, vacuum-sealed, and dispatched through our priority international express courier network on the same day. Standard orders ship within 48 hours with full tracking provided.',
      ),
      category: 'Shipping',
      ctaLabel: 'View shipping info',
      ctaHref: '/shipping',
      order: 30,
      isActive: true,
    },
    {
      _id: 'faq-wholesale-pricing',
      _type: 'faqItem',
      question: 'What wholesale pricing tiers are available?',
      answer: blocks(
        'Our system automatically applies three progressive tiered discount levels based on your total order volume. No separate wholesale registration required — the more you order, the lower your per-unit cost at checkout. Additional payment-method discounts (10% crypto, 5% Revolut/card) stack with your volume tier.',
      ),
      category: 'Wholesale',
      ctaLabel: 'Apply for wholesale',
      ctaHref: '/wholesale',
      order: 40,
      isActive: true,
    },
    {
      _id: 'faq-customs-clearance',
      _type: 'faqItem',
      question: 'What is your customs clearance guarantee?',
      answer: blocks(
        'We guarantee 100% customs clearance on all international shipments. Every order is vacuum-sealed, discreetly containerised, and shipped with accurate customs documentation. In the rare event that a package is held at customs, we initiate an immediate priority reshipment at zero cost to you.',
      ),
      category: 'Shipping',
      ctaLabel: 'Shipping policy',
      ctaHref: '/shipping',
      order: 50,
      isActive: true,
    },
    {
      _id: 'faq-anavar-trenbolone',
      _type: 'faqItem',
      question: 'Do you stock Anavar (Oxandrolone) and Trenbolone?',
      answer: blocks(
        'Yes. We stock pharmaceutical-grade Anavar (Oxandrolone) in 10mg and 50mg oral tablets, and Trenbolone in Acetate and Enanthate ester forms as injectable 10ml vials. Every batch is HPLC-verified for correct dosing, purity, and sterility.',
      ),
      category: 'Products',
      ctaLabel: 'Shop oral steroids',
      ctaHref: '/category/oral-steroids',
      order: 60,
      isActive: true,
    },
    {
      _id: 'faq-pct',
      _type: 'faqItem',
      question: 'Do you sell post-cycle therapy (PCT) supplements?',
      answer: blocks(
        'Yes. Our PCT category includes Nolvadex (Tamoxifen), Clomid (Clomiphene), Aromasin (Exemestane), and HCG to support complete hormonal recovery after an AAS cycle. Running a structured PCT protocol is critical for restoring natural testosterone production.',
      ),
      category: 'PCT',
      ctaLabel: 'PCT supplements',
      ctaHref: '/category/pct-supplements',
      order: 70,
      isActive: true,
    },
    {
      _id: 'faq-payment-methods',
      _type: 'faqItem',
      question: 'What payment methods do you accept?',
      answer: blocks(
        'We accept cryptocurrency (BTC, ETH, USDT) with a 10% discount applied at invoice, Revolut and card payments with a 5% discount, and bank transfer / SEPA for qualifying wholesale orders. All payment discounts stack with your volume tier pricing.',
      ),
      category: 'Payment',
      ctaLabel: 'Wholesale application',
      ctaHref: '/wholesale',
      order: 80,
      isActive: true,
    },
  ]

  for (const faq of faqs) {
    await upsert(faq)
  }

  // ─── 10. Shipping Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'shippingPage',
    _type: 'shippingPage',
    title: 'Shipping Policy',
    description: 'SteroidsSupplies shipping policy covering processing times, domestic and international delivery, customs clearance guarantee, and tracking guidance.',
    lastUpdated: '2026-06-01',
    sections: [
      {_type: 'legalSection', title: '1. Processing Time', paragraphs: ['Orders are reviewed and dispatched within 24 to 48 hours on business days after payment confirmation.', 'Same-day priority dispatch is available for qualifying orders placed before 12:00 PM local warehouse time.']},
      {_type: 'legalSection', title: '2. UK Domestic Shipping', paragraphs: ['UK orders are dispatched via tracked express courier with standard delivery within 48 hours of dispatch.'], bullets: ['48-hour tracked delivery across all UK regions', 'Same-day dispatch available for qualifying orders', 'Discreet vacuum-sealed packaging on every order']},
      {_type: 'legalSection', title: '3. International Shipping (USA & Worldwide)', paragraphs: ['We ship globally to the USA and international destinations via our priority international express courier network.', 'All cross-border shipments are vacuum-sealed, discreetly containerised, and accompanied by accurate customs documentation to maximise clearance success.']},
      {_type: 'legalSection', title: '4. Customs Clearance Guarantee', paragraphs: ['We guarantee 100% customs clearance on all international shipments. In the rare event that a package is held or seized at customs, we initiate an immediate priority reshipment at zero cost to the buyer.', 'Contact us with your order reference and we will arrange reshipment within one business day.']},
      {_type: 'legalSection', title: '5. Buyer Compliance Responsibility', paragraphs: ['International buyers are responsible for verifying that the import of AAS compounds is legal within their jurisdiction before placing an order.', 'SteroidsSupplies assumes no legal liability for customs items that run contrary to the buyer\'s local laws.'], bullets: ['Verify local AAS import laws before ordering', 'Buyers are importer-of-record in their jurisdiction', 'We provide accurate customs documentation — buyer is responsible for compliance']},
      {_type: 'legalSection', title: '6. Tracking and Delivery Updates', paragraphs: ['Tracking details are sent via email once your order is dispatched. Use the provided carrier link to monitor shipment milestones.', 'If a package is delayed or undeliverable, contact support@steroidssupplies.co.uk with your order reference for immediate assistance.']},
    ],
  })

  // ─── 11. MOQ Page ────────────────────────────────────────────────────────
  await upsert({
    _id: 'moqPage',
    _type: 'moqPage',
    title: 'Wholesale MOQ',
    description: 'Understand SteroidsSupplies minimum order requirements, volume pricing tiers, and practical examples for first and repeat wholesale orders.',
    heroTitle: 'What Are the Minimum Order Requirements for Wholesale AAS?',
    heroIntro: 'Our tiered pricing activates automatically at checkout with no minimum registration required. Volume price breaks apply progressively from £500 to £10,000+. Submit a wholesale inquiry to receive a formal quote within one business day.',
    lastUpdated: '2026-06-01',
    moqExamples: [
      {_type: 'object', title: 'Starter Order', totalBadge: '£500+', description: 'Entry-level wholesale from £500. Mix injectable vials, oral tablets, and PCT compounds to test margins before scaling.'},
      {_type: 'object', title: 'Volume Tier', totalBadge: '£1,500+', description: 'Volume discount tier activates from £1,500. Reduced per-unit cost with 48-hour guaranteed dispatch.'},
      {_type: 'object', title: 'Commercial Bulk', totalBadge: '£5,000+', description: 'Best per-unit pricing from £5,000+. Preferred for commercial gym networks and regional distribution hubs.'},
    ],
    sections: [
      {_type: 'legalSection', title: '1. Tiered Volume Pricing', paragraphs: ['SteroidsSupplies applies automatic tiered discounts at checkout based on total order value — no registration or manual quoting required.', 'Tier 1: £500–£1,500 at standard wholesale pricing. Tier 2: £1,500–£5,000 with volume discount. Tier 3: £5,000–£10,000 at priority pricing. Tier 4: £10,000+ with custom commercial brackets.']},
      {_type: 'legalSection', title: '2. Mix-and-Match Policy', paragraphs: ['You may combine injectable steroids, oral tablets, and PCT supplements across categories to reach your order volume.'], bullets: ['Mix injectables, orals, and PCT compounds in a single order', 'Build trial assortments for first orders before scaling reorders', 'Contact our team to balance your initial wholesale inventory basket']},
      {_type: 'legalSection', title: '3. Payment Method Discounts', paragraphs: ['Additional discounts stack on top of your volume tier:', 'Cryptocurrency (BTC, ETH, USDT): 10% discount.', 'Revolut / Card: 5% discount.', 'Bank Transfer / SEPA: standard pricing.']},
      {_type: 'legalSection', title: '4. Free Shipping Threshold', paragraphs: ['All orders include tracked international shipping. Same-day priority dispatch is available for qualifying orders placed before 12:00 PM.']},
    ],
  })

  // ─── 12. Locations Page ──────────────────────────────────────────────────
  await upsert({
    _id: 'locationsPage',
    _type: 'locationsPage',
    title: 'Delivery Locations & Coverage',
    description: 'See SteroidsSupplies delivery coverage across the UK, USA, and approved international markets, with region-specific compliance notes.',
    heroTitle: 'International Shipping Locations and Coverage',
    heroIntro: 'We support B2C and B2B wholesale delivery across the UK, USA, and selected international destinations. Every order is vacuum-sealed and discreetly packaged with a 100% customs clearance guarantee.',
    lastUpdated: '2026-06-01',
    mapEmbedUrl: 'https://www.google.com/maps?q=United+Kingdom&output=embed',
    usStates: [],
    internationalCoverage: [
      {_type: 'object', title: 'United Kingdom', details: 'Primary market. 48-hour tracked domestic delivery. All UK regions covered.'},
      {_type: 'object', title: 'United States', details: 'International orders shipped via priority express. 100% customs clearance guarantee applies.'},
      {_type: 'object', title: 'Europe', details: 'EU and mainland Europe shipping available. Buyers verify local AAS import laws before ordering.'},
      {_type: 'object', title: 'Rest of World', details: 'Global distribution available where carrier serviceability and AAS import laws allow. Contact us for eligibility.'},
    ],
    complianceNotes: [
      {_type: 'object', region: 'UK Orders', note: 'Delivery within 48 hours. Buyers are responsible for verifying AAS legal status in their local jurisdiction.'},
      {_type: 'object', region: 'USA & International', note: 'AAS import regulations vary by country. Buyers are importer-of-record and solely responsible for local customs compliance. Our 100% clearance guarantee triggers a free reshipment if interference occurs.'},
    ],
    sections: [
      {_type: 'legalSection', title: '1. UK Coverage', paragraphs: ['SteroidsSupplies delivers to all UK regions within 48 hours via tracked express courier.', 'Same-day priority dispatch is available for qualifying UK orders placed before 12:00 PM.']},
      {_type: 'legalSection', title: '2. USA & International Shipping', paragraphs: ['International orders ship via priority express with full tracking and 100% customs clearance guarantee.', 'All packages are vacuum-sealed, discreetly containerised, and shipped with accurate customs invoices.'], bullets: ['USA shipments via priority international express', 'EU and global routing on approved lanes', 'Immediate free reshipment triggered if customs interference occurs']},
      {_type: 'legalSection', title: '3. Buyer Compliance Responsibility', paragraphs: ['The import and possession of AAS are regulated or controlled in many jurisdictions.', 'Buyers must verify local laws before ordering. SteroidsSupplies assumes no liability for buyer non-compliance with regional regulations.']},
    ],
  })

  // ─── 13. Wholesale Form Config ───────────────────────────────────────────
  await upsert({
    _id: 'wholesaleFormConfig',
    _type: 'wholesaleFormConfig',
    estimatedOrderValues: [
      {_key: 'range-500', rangeLabel: '£500 – £1,500', rangeValue: 'range-500', sortOrder: 0},
      {_key: 'range-1500', rangeLabel: '£1,500 – £5,000', rangeValue: 'range-1500', sortOrder: 1},
      {_key: 'range-5000', rangeLabel: '£5,000 – £10,000', rangeValue: 'range-5000', sortOrder: 2},
      {_key: 'range-10000', rangeLabel: '£10,000+', rangeValue: 'range-10000', sortOrder: 3},
    ],
    paymentMethods: [
      {_key: 'crypto', label: 'Cryptocurrency (BTC, ETH, USDT)', methodValue: 'crypto', helpText: '10% discount available', sortOrder: 0},
      {_key: 'revolut', label: 'Revolut / Card', methodValue: 'revolut', helpText: '5% discount available', sortOrder: 1},
      {_key: 'bank', label: 'Bank Transfer / SEPA', methodValue: 'bank', helpText: 'Contact our team for terms', sortOrder: 2},
    ],
    formLabels: {
      businessNameLabel: 'Business Name (Optional)', businessNameHelp: 'Your company, gym, or business name',
      contactNameLabel: 'Contact Name', contactNameHelp: 'Primary contact person',
      emailLabel: 'Email Address', emailHelp: "We'll send confirmation to this address",
      phoneLabel: 'Phone Number', phoneHelp: 'Your business or personal phone number',
      countryStateLabel: 'Country / Region', countryStateHelp: 'Your delivery location',
      productInterestsLabel: 'Product Interests', productInterestsHelp: 'Select at least one option',
      orderValueLabel: 'Estimated Order Value', orderValueHelp: 'Your typical order range',
      paymentMethodLabel: 'Preferred Payment Method', paymentMethodHelp: "How you'd prefer to pay",
      notesLabel: 'Additional Notes (Optional)', notesHelp: 'Any additional information for our team',
      submitButtonText: 'Submit Inquiry',
    },
  })

  console.log('\n🎉 Seed complete! All SteroidsSupplies content has been created in Sanity.')
  console.log('   → Open Sanity Studio and publish each document to make it live.')
  console.log('   → Add images to product categories and the About Page hero via Studio.')
}

seed().catch((err) => {
  console.error('\n❌ Seed failed:', err)
  process.exit(1)
})
