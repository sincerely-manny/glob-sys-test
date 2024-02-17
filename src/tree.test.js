import { expect, test } from 'vitest';
import { buildTree, drawTree } from './tree.ts';

test('Test buildind 1-level tree', () => {
    const input = '(10)';
    const tree = buildTree(input);
    expect(tree.tree.length).toBe(1);
    expect(tree.tree[0].x).toBe(0);
    expect(tree.tree[0].y).toBe(0);
    expect(tree.offsets['0']).toBe(2);
});

test('Test buildind from (1 (2 (4 5 6 (7) 108 (9)) 3))', () => {
    const input = '(1 (2 (4 5 6 (7) 108 (9)) 3))';
    const tree = buildTree(input);
    expect(tree.tree.length).toBe(9);
});

test('Test drawing from (1 (2 (4 5 6 (7) 108 (9)) 3))', () => {
    const input = '(1 (2 (4 5 6 (7) 108 (9)) 3))';
    const { tree, offsets } = buildTree(input);
    const result = drawTree(tree, offsets);
    console.log(offsets);
    expect(result.trim()).toBe(`1---+
    2---+
    |   4
    |   5
    |   6-----+
    |   |     7
    |   108---+
    |         9
    3`);
});
