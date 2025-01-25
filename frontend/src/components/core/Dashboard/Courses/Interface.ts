export interface SubSection {
	_id: string;
	title: string;
	timeDuration: string;
	description: string;
	videoUrl: string;
	videoUrlPublicId: string;
    createdAt ?: string,
}
export interface Section {
	_id: string;
	sectionName: string;
	subSection: SubSection[];
}

