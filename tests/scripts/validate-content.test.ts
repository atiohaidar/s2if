import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findCycle, hasDuplicates } from '../../scripts/validate-content';

describe('validate-content helpers', () => {
    it('detects duplicates correctly', () => {
        const duplicates = hasDuplicates(['a', 'b', 'a', 'c', 'b', 'd']);
        assert.deepEqual(new Set(duplicates), new Set(['a', 'b']));
    });

    it('returns null when no cycle exists', () => {
        const graph = new Map<string, string[]>([
            ['intro', []],
            ['konsep', ['intro']],
            ['dp', ['konsep']],
        ]);
        assert.equal(findCycle(graph), null);
    });

    it('detects prerequisite cycles', () => {
        const graph = new Map<string, string[]>([
            ['a', ['b']],
            ['b', ['c']],
            ['c', ['a']],
        ]);
        const cycle = findCycle(graph);
        assert.ok(cycle);
        assert.equal(cycle?.[0], 'a');
        assert.equal(cycle?.at(-1), 'a');
    });
});