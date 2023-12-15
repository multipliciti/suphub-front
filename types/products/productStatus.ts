export const productStatuses = [
	'draft',
	'published',
	'archived',
	'rfqOnly',
] as const;

export type ProductItemStatus = (typeof productStatuses)[number];

export const productLabelStatuses: { [key in ProductItemStatus]: string } = {
	draft: 'Draft',
	published: 'Active',
	archived: 'Archived',
	rfqOnly: 'RFQ',
};
