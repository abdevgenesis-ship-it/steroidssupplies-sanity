import 'dotenv/config'
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'gxu7e27l',
  dataset: 'production',
  apiVersion: '2025-03-01',
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const introSectionText =
  'Welcome to the core distribution engine of our enterprise. Our anabolic steroids wholesale platform provides commercial gym owners, private retail labels, and high-volume independent distributors with direct access to unmatched manufacturing volume. We have completely eliminated complex wholesale registration and login barriers. Our storefront automatically applies three progressive tiered discount levels directly to listed products based on your total order volume. Buy wholesale gear at true manufacturing costs and leverage our guaranteed 48-hour priority shipping network.'

const semanticContentSections = [
  {
    _type: 'object',
    _key: 'wholesale-semantic-0',
    heading: 'Anabolic Steroids Wholesale Hub for Verified Bulk Procurement',
    paragraphs: [
      'Establishing an unbroken supply line through an anabolic steroids wholesale contract is the cornerstone of running a highly lucrative distribution business. At Steroids Supplies, we operate custom-built laboratory facilities capable of outputting massive volumes of pure wholesale anabolic steroids for sale.',
      'Resellers can seamlessly browse our integrated catalog to secure extensive quantities of raw AAS steroids buy options, high-demand oral tablets, and stable oil injections. Every single bulk batch is accompanied by comprehensive laboratory analysis, giving your downstream retail customers complete confidence.',
    ],
  },
  {
    _type: 'object',
    _key: 'wholesale-semantic-1',
    heading: 'High-Margin Tiered Pricing Matrices on Global Shipments',
    paragraphs: [
      'Our system completely removes the friction of manual quoting by utilizing dynamic checkout pricing tiers. The more units your retail business orders, the lower your per-unit cost drops automatically.',
    ],
  },
  {
    _type: 'object',
    _key: 'wholesale-semantic-2',
    heading: 'Global Supply Reliability and Secure Commercial Logistics',
    paragraphs: [
      'If you need to buy anabolic steroids online at bulk scale, security and transit timing are non-negotiable. We pack all commercial orders using industrial vacuum sealing, customized non-descript container shapes, and completely anonymous shipping routes. This guarantees an unmatched customs clearance rate into the USA, mainland Europe, and international distribution hubs. Scale your business, protect your margins, and keep your retail shelves stocked with the finest performance gear on earth.',
    ],
  },
]

const wholesaleTargetRows = [
  {
    _type: 'object',
    _key: 'wholesale-target-0',
    target: 'Gym Network Supplies',
    assetAdvantage: 'Bulk Oral & Injectable Stacks',
    logisticalDispatch: '48H Discrete Courier',
  },
  {
    _type: 'object',
    _key: 'wholesale-target-1',
    target: 'Domestic Distribution Hubs',
    assetAdvantage: 'Mass 10ml Vials & Raw Tabs',
    logisticalDispatch: 'Same-Day Priority Freight',
  },
  {
    _type: 'object',
    _key: 'wholesale-target-2',
    target: 'International Storefronts',
    assetAdvantage: 'Multi-Brand Custom Inventory',
    logisticalDispatch: '100% Customs Clearance',
  },
]

async function main() {
  if (!client.config().token) {
    throw new Error('Missing Sanity write token. Set SANITY_API_TOKEN, SANITY_AUTH_TOKEN, or SANITY_API_WRITE_TOKEN.')
  }

  await client
    .patch('wholesalePage')
    .set({
      introSectionHeading: 'Section 1: Introduction',
      introSectionText,
      semanticContentHeading: 'Section 2: Rich Text & Semantic Content',
      semanticContentSections,
      wholesaleTargetRows,
      whyHeading: 'Anabolic Steroids Wholesale Hub for Verified Bulk Procurement',
      whyIntro:
        'Establishing an unbroken supply line through an anabolic steroids wholesale contract is the cornerstone of running a highly lucrative distribution business. At Steroids Supplies, we operate custom-built laboratory facilities capable of outputting massive volumes of pure wholesale anabolic steroids for sale.',
      discountHeading: 'High-Margin Tiered Pricing Matrices on Global Shipments',
      discountIntro:
        'Our system completely removes the friction of manual quoting by utilizing dynamic checkout pricing tiers. The more units your retail business orders, the lower your per-unit cost drops automatically.',
    })
    .commit()

  // eslint-disable-next-line no-console
  console.log('Patched wholesalePage with DOCX wholesale content.')
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error)
  process.exit(1)
})
