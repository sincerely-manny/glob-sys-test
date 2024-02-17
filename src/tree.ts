type Node = {
    value: number;
    x: number;
    y: number;
};

type Tree = Node[];

function replaceCharAt(str: string, index: number, char: string) {
    return `${str.substring(0, index)}${char}${str.substring(index + 1)}`;
}

export function buildTree(data: string) {
    let input: string;
    try {
        [, input] = data.match(/^\((.*)\)$/)!;
    } catch (e) {
        throw new Error('Invalid input');
    }
    const tree: Tree = [];
    const level = {
        x: 0,
        y: 0,
    };
    const offsets: Record<number, number> = {};
    for (let i = 0; i < input.length; i++) {
        let char = input[i];
        if (char === '(') {
            level.x++;
        } else if (char === ')') {
            level.x--;
        } else if (char === ' ') {
            //
        } else {
            if (Number.isNaN(parseInt(char, 10))) {
                throw new Error('Invalid input');
            }
            while (!Number.isNaN(parseInt(input[i + 1], 10))) {
                i++;
                char = `${char}${input[i]}`;
            }
            tree.push({
                value: parseInt(char, 10),
                x: level.x,
                y: level.y,
            });
            if (offsets[level.x] === undefined) {
                offsets[level.x] = char.length;
            } else {
                offsets[level.x] = Math.max(offsets[level.x], char.length);
            }
        }
    }
    return { tree, offsets };
}

export function drawTree(tree: Tree, offsets: Record<number, number>) {
    const treeStr: string[] = [''];
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        let offset = node.x * 4;
        Object.entries(offsets).forEach(([x, o]) => {
            if (o > 1 && parseInt(x, 10) < node.x) {
                offset += o - 1;
            }
        });
        treeStr[treeStr.length - 1] += Array(offset).fill(' ').join('');
        treeStr[treeStr.length - 1] += `${node.value}`;
        if (tree[i + 1] && tree[i + 1].x > node.x) {
            treeStr[treeStr.length - 1] += Array(offsets[node.x] + 3 - node.value.toString().length)
                .fill('-')
                .join('');
            treeStr[treeStr.length - 1] += '+';
        }
        const sameLvl = tree.findIndex((n) => n.x === node.x);
        if (sameLvl !== -1) {
            const charIndex = offset;
            let strIndex = sameLvl + 1;
            while (strIndex < i) {
                if (treeStr[strIndex][charIndex] === ' ') {
                    treeStr[strIndex] = replaceCharAt(treeStr[strIndex], charIndex, '|');
                }
                strIndex++;
            }
        }

        treeStr.push('');
    }
    return treeStr.join('\n');
}
