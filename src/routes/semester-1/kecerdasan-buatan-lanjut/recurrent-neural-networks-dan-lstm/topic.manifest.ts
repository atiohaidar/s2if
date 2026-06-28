import type { TopicManifest } from '$lib/data/content';

const manifest: TopicManifest = {
    id: 'recurrent-neural-networks-dan-lstm',
    slug: 'recurrent-neural-networks-dan-lstm',
    title: 'Recurrent Neural Networks dan LSTM',
    summary: 'Pemrosesan data sekuens menggunakan Recurrent Neural Networks (RNN), rumus hidden state, BPTT, vanishing/exploding gradients, dan LSTM (Forget, Input, Output gates).',
    type: 'catatan',
    track: 'materi',
    status: 'done',
    order: 13,
    tags: ['rnn', 'lstm', 'sequence-data', 'deep-learning'],
    prereq: ['deep-learning'],
    renderMode: 'note',
};

export default manifest;
