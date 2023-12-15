export const productStatuses = [
	'draft',
	'rfqOnly',
	'published',
	'archived',
] as const;

export type ProductItemStatus = (typeof productStatuses)[number];

export const productLabelStatuses: { [key in ProductItemStatus]: string } = {
	draft: 'Draft',
	archived: 'Archived',
	published: 'Published',
	rfqOnly: 'RFQ',
};
