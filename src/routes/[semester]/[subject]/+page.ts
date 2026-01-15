import { curriculum } from '$lib/data/curriculum';

// Generate entries for prerendering all subject pages
export function entries() {
    const entries: { semester: string; subject: string }[] = [];

    for (const semester of curriculum) {
        for (const subject of semester.subjects) {
            entries.push({
                semester: semester.id,
                subject: subject.id
            });
        }
    }

    return entries;
}
