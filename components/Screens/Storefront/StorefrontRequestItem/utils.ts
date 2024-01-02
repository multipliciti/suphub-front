export const findProjectById = (
	projects: any[],
	targetId: string | number | undefined
) => {
	const targetIdInner = Number(targetId);
	for (const project of projects) {
		if (project.id === targetIdInner) {
			return project;
		}
	}
	return undefined;
};
