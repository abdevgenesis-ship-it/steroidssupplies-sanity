import {defineField, defineType} from 'sanity'

export const compliancePage = defineType({
  name: 'compliancePage',
  title: 'Compliance Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO / meta title (without site name)',
      type: 'string',
      initialValue: 'Compliance, Legal Terms & Safety Notices',
      description: 'Used in the browser tab and meta title tag. The site name is appended automatically.',
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: 'pageHeading',
      title: 'Page H1 heading',
      type: 'string',
      initialValue: 'Legality, Jurisdictional Compliance, and Chemical Safety Documentation',
      description: 'Main visible heading rendered as the H1 on the page.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page subtitle (below H1)',
      type: 'text',
      rows: 2,
      initialValue:
        'Crucial legal frameworks and safety disclosures regarding the purchase, possession, and application of anabolic compounds.',
      description: 'Short supporting line rendered below the H1.',
    }),
    defineField({
      name: 'description',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().min(40).max(320),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last updated',
      type: 'date',
    }),
    defineField({
      name: 'sections',
      title: 'Content sections',
      type: 'array',
      of: [{type: 'legalSection'}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})
