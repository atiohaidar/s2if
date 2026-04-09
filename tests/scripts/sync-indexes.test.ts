import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { serializeArray, toTitleFromSlug } from '../../scripts/sync-indexes';

describe('sync-indexes helpers', () => {
    it('converts slug to title', () => {
        assert.equal(toTitleFromSlug('kecerdasan-buatan-lanjut'), 'Kecerdasan Buatan Lanjut');
    });

    it('serializes arrays safely', () => {
        assert.equal(serializeArray([]), '[]');
        assert.equal(serializeArray(['ai', "o'reilly"]), "['ai', 'o\\'reilly']");
    });
});