import './style.css';
import { buildTree, drawTree } from './tree.ts';

const form = document.querySelector<HTMLFormElement>('#tree-form');

if (!form) {
    throw new Error('Form not found');
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const input = form.querySelector<HTMLInputElement>('#tree-data');

    const errors = document.querySelector<HTMLDivElement>('#errors');
    if (errors) {
        errors.innerHTML = '';
    }

    try {
        if (!input) {
            throw new Error('Input not found');
        }

        const treeData = input.value.trim();

        if (!treeData) {
            throw new Error('Tree data not found');
        }

        const { tree, offsets } = buildTree(treeData);
        const treeStr = drawTree(tree, offsets);
        const cont = document.querySelector<HTMLDivElement>('#tree-container');
        if (!cont) {
            throw new Error('Container not found');
        }

        const parent = cont.parentElement;
        if (parent) {
            parent.style.height = `${parent.clientHeight}px`;
        }

        cont.innerHTML = treeStr;

        if (parent) {
            parent.style.height = `${cont.clientHeight}px`;
        }
    } catch (e) {
        // console.error(e);
        if (errors && e instanceof Error) {
            errors.innerHTML = e.message;
        }
    }
});
