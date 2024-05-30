import './bundle.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';

import Xpong from '/components/xpong/xpong';

const root = createRoot(document.getElementById('root'));
root.render(<Xpong/>);
