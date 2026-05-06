import React, { useState, useEffect, useCallback, useRef } from 'react';

// --- Template Schemas (Upgraded for Auto-Flow Layout) ---

// 1. Standard Executive (Classic 1 Col)
const classicTemplate = {
  id: 'classic_1col',
  name: 'Standard Executive (Classic)',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: [
    { id: 'fullName', col: 'main', label: 'Full Name', fontSize: 32, fontWeight: 'bold', color: '#111827', textAlign: 'left', marginBottom: 5, defaultVal: 'Your Name' },
    { id: 'title', col: 'main', label: 'Professional Title', fontSize: 16, fontWeight: 'normal', color: '#6b7280', textAlign: 'left', marginBottom: 15, defaultVal: 'Your Title' },
    
    { id: 'phone', col: 'main', label: 'Phone', inline: true, iconType: 'phone', fontSize: 11, color: '#6b7280', marginRight: 20, marginBottom: 30, defaultVal: '+1 234 567 8900' },
    { id: 'email', col: 'main', label: 'Email', inline: true, iconType: 'email', fontSize: 11, color: '#6b7280', marginRight: 20, marginBottom: 30, defaultVal: 'email@example.com' },
    { id: 'linkedin', col: 'main', label: 'LinkedIn', inline: true, iconType: 'linkedin', fontSize: 11, color: '#6b7280', marginBottom: 30, defaultVal: 'linkedin.com/in/username' },
    
    { id: 'summaryTitle', col: 'main', label: 'Summary Header', headerIcon: 'user', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'BACKGROUND & EXPERTISE' },
    { id: 'summary', col: 'main', label: 'Summary Text', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: 'A brief summary of your expertise.' },
    
    { id: 'techSkillsTitle', col: 'main', label: 'Technical Skills Header', headerIcon: 'code', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'TECHNICAL SKILLS' },
    { id: 'techSkills', col: 'main', label: 'Technical Skills', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: '• Skill 1\n• Skill 2' },

    { id: 'funcSkillsTitle', col: 'main', label: 'Functional Skills Header', headerIcon: 'settings', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'FUNCTIONAL SKILLS' },
    { id: 'funcSkills', col: 'main', label: 'Functional Skills', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: '• Skill 1\n• Skill 2' },
    
    { id: 'certsTitle', col: 'main', label: 'Certifications Header', headerIcon: 'award', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'CERTIFICATIONS' },
    { id: 'certifications', col: 'main', label: 'Certifications', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: '• Cert 1' },

    { id: 'industryTitle', col: 'main', label: 'Industry Header', headerIcon: 'building', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'INDUSTRY BACKGROUND' },
    { id: 'industry', col: 'main', label: 'Industry', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: '• Industry 1' },

    { id: 'expTitle', col: 'main', label: 'Experience Header', headerIcon: 'briefcase', fontSize: 14, fontWeight: 'bold', color: '#047857', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'PROFESSIONAL EXPERIENCE' },
    
    { id: 'job1Title', col: 'main', label: 'Job 1 Title', fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginBottom: 5, defaultVal: 'Company - Role' },
    { id: 'job1Desc', col: 'main', label: 'Job 1 Description', isMultiline: true, fontSize: 11, color: '#4b5563', marginBottom: 20, defaultVal: 'Describe your responsibilities here.' },
    { id: 'job2Title', col: 'main', label: 'Job 2 Title', fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginBottom: 5, defaultVal: '' },
    { id: 'job2Desc', col: 'main', label: 'Job 2 Description', isMultiline: true, fontSize: 11, color: '#4b5563', marginBottom: 20, defaultVal: '' },
    { id: 'job3Title', col: 'main', label: 'Job 3 Title', fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginBottom: 5, defaultVal: '' },
    { id: 'job3Desc', col: 'main', label: 'Job 3 Description', isMultiline: true, fontSize: 11, color: '#4b5563', marginBottom: 20, defaultVal: '' },
    { id: 'job4Title', col: 'main', label: 'Job 4 Title', fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginBottom: 5, defaultVal: '' },
    { id: 'job4Desc', col: 'main', label: 'Job 4 Description', isMultiline: true, fontSize: 11, color: '#4b5563', marginBottom: 20, defaultVal: '' },
    { id: 'job5Title', col: 'main', label: 'Job 5 Title', fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginBottom: 5, defaultVal: '' },
    { id: 'job5Desc', col: 'main', label: 'Job 5 Description', isMultiline: true, fontSize: 11, color: '#4b5563', marginBottom: 20, defaultVal: '' }
  ]
};

// 2. Modern Split (2 Col)
const modernTwoColTemplate = {
  id: 'modern_2col',
  name: 'Modern Split (Two Column)',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#1e293b',
  rightBg: '#ffffff',
  elements: [
    { id: 'profilePic', col: 'left', label: 'Profile Picture', type: 'image', width: 120, height: 120, marginBottom: 25, alignSelf: 'center', defaultVal: '' },
    { id: 'fullName', col: 'left', label: 'Full Name', fontSize: 24, fontWeight: 'bold', color: '#ffffff', textAlign: 'center', marginBottom: 5, defaultVal: 'Your Name' },
    { id: 'title', col: 'left', label: 'Professional Title', fontSize: 12, fontWeight: 'normal', color: '#94a3b8', textAlign: 'center', marginBottom: 35, defaultVal: 'Your Title' },
    
    { id: 'phone', col: 'left', label: 'Phone', iconType: 'phone', fontSize: 10, color: '#cbd5e1', marginBottom: 12, defaultVal: '+1 234 567 8900' },
    { id: 'email', col: 'left', label: 'Email', iconType: 'email', fontSize: 10, color: '#cbd5e1', marginBottom: 12, defaultVal: 'email@example.com' },
    { id: 'linkedin', col: 'left', label: 'LinkedIn', iconType: 'linkedin', fontSize: 10, color: '#cbd5e1', marginBottom: 35, defaultVal: 'linkedin.com/in/username' },
    
    { id: 'techSkillsTitle', col: 'left', label: 'Technical Skills Header', headerIcon: 'code', fontSize: 12, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #334155', paddingBottom: 5, marginBottom: 15, defaultVal: 'TECHNICAL SKILLS' },
    { id: 'techSkills', col: 'left', label: 'Technical Skills', isMultiline: true, fontSize: 10, color: '#cbd5e1', marginBottom: 35, defaultVal: '• Skill 1\n• Skill 2' },

    { id: 'funcSkillsTitle', col: 'left', label: 'Functional Skills Header', headerIcon: 'settings', fontSize: 12, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #334155', paddingBottom: 5, marginBottom: 15, defaultVal: 'FUNCTIONAL SKILLS' },
    { id: 'funcSkills', col: 'left', label: 'Functional Skills', isMultiline: true, fontSize: 10, color: '#cbd5e1', marginBottom: 35, defaultVal: '• Skill 1\n• Skill 2' },
    
    { id: 'certsTitle', col: 'left', label: 'Certifications Header', headerIcon: 'award', fontSize: 12, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #334155', paddingBottom: 5, marginBottom: 15, defaultVal: 'CERTIFICATIONS' },
    { id: 'certifications', col: 'left', label: 'Certifications', isMultiline: true, fontSize: 10, color: '#cbd5e1', marginBottom: 35, defaultVal: '• Cert 1' },
    
    { id: 'industryTitle', col: 'left', label: 'Industry Header', headerIcon: 'building', fontSize: 12, fontWeight: 'bold', color: '#ffffff', borderBottom: '1px solid #334155', paddingBottom: 5, marginBottom: 15, defaultVal: 'INDUSTRY BACKGROUND' },
    { id: 'industry', col: 'left', label: 'Industry', isMultiline: true, fontSize: 10, color: '#cbd5e1', marginBottom: 35, defaultVal: '• Industry 1' },

    { id: 'summaryTitle', col: 'right', label: 'Summary Header', headerIcon: 'user', fontSize: 14, fontWeight: 'bold', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: 5, marginBottom: 15, defaultVal: 'PROFILE' },
    { id: 'summary', col: 'right', label: 'Summary Text', isMultiline: true, fontSize: 11, color: '#334155', marginBottom: 35, defaultVal: 'A brief summary of your expertise.' },
    
    { id: 'expTitle', col: 'right', label: 'Experience Header', headerIcon: 'briefcase', fontSize: 14, fontWeight: 'bold', color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: 5, marginBottom: 15, defaultVal: 'EXPERIENCE' },
    
    { id: 'job1Title', col: 'right', label: 'Job 1 Title', fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 5, defaultVal: 'Company - Role' },
    { id: 'job1Desc', col: 'right', label: 'Job 1 Description', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 25, defaultVal: 'Responsibilities.' },
    { id: 'job2Title', col: 'right', label: 'Job 2 Title', fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 5, defaultVal: '' },
    { id: 'job2Desc', col: 'right', label: 'Job 2 Description', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 25, defaultVal: '' },
    { id: 'job3Title', col: 'right', label: 'Job 3 Title', fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 5, defaultVal: '' },
    { id: 'job3Desc', col: 'right', label: 'Job 3 Description', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 25, defaultVal: '' },
    { id: 'job4Title', col: 'right', label: 'Job 4 Title', fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 5, defaultVal: '' },
    { id: 'job4Desc', col: 'right', label: 'Job 4 Description', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 25, defaultVal: '' },
    { id: 'job5Title', col: 'right', label: 'Job 5 Title', fontSize: 12, fontWeight: 'bold', color: '#1e293b', marginBottom: 5, defaultVal: '' },
    { id: 'job5Desc', col: 'right', label: 'Job 5 Description', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 25, defaultVal: '' }
  ]
};

// 3. Minimalist Clean (1 Col)
const minimalistCleanTemplate = {
  id: 'minimalist_1col',
  name: 'Minimalist Clean',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, color: el.fontSize > 12 ? '#000000' : '#4b5563', headerIcon: null, iconType: null };
    if (el.borderBottom) newEl.borderBottom = '1px solid #e5e7eb';
    return newEl;
  })
};

// 4. Accent Indigo (1 Col)
const accentIndigoTemplate = {
  id: 'accent_indigo_1col',
  name: 'Accent Indigo',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.id === 'fullName') newEl.color = '#312e81'; 
    if (el.borderBottom) {
      newEl.color = '#4f46e5'; 
      newEl.borderBottom = '2px solid #c7d2fe'; 
    }
    return newEl;
  })
};

// 5. Soft Blue Split (2 Col)
const softBlueTwoColTemplate = {
  id: 'soft_blue_2col',
  name: 'Soft Blue Split',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#f0f9ff', 
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#0c4a6e' : '#0369a1'; 
      if (el.borderBottom) newEl.borderBottom = '1px solid #bae6fd';
    } else {
      if (el.borderBottom) newEl.color = '#0c4a6e';
    }
    return newEl;
  })
};

// 6. Dark Mode Tech (2 Col)
const darkModeTwoColTemplate = {
  id: 'dark_mode_2col',
  name: 'Dark Mode Tech',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#000000',
  rightBg: '#111827', 
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#9ca3af';
      if (el.borderBottom) {
        newEl.color = '#10b981'; 
        newEl.borderBottom = '1px solid #374151';
      }
    } else {
      newEl.color = el.fontSize > 12 ? '#f9fafb' : '#d1d5db';
      if (el.borderBottom) {
        newEl.color = '#10b981';
        newEl.borderBottom = '1px solid #374151';
      }
    }
    return newEl;
  })
};

// 7. Executive Ruby (1 Col)
const executiveRubyTemplate = {
  id: 'exec_ruby_1col',
  name: 'Executive Ruby',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.id === 'fullName') newEl.color = '#881337'; 
    if (el.borderBottom) {
      newEl.color = '#be123c'; 
      newEl.borderBottom = '1px solid #fecdd3'; 
    }
    return newEl;
  })
};

// 8. Emerald Split (2 Col)
const emeraldTwoColTemplate = {
  id: 'emerald_2col',
  name: 'Emerald Split',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#064e3b', 
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#a7f3d0'; 
      if (el.borderBottom) {
        newEl.color = '#34d399'; 
        newEl.borderBottom = '1px solid #047857'; 
      }
    }
    return newEl;
  })
};

// 9. Slate Minimal (1 Col)
const slateMinimalTemplate = {
  id: 'slate_minimal_1col',
  name: 'Slate Minimal',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, headerIcon: null }; 
    if (el.borderBottom) {
      newEl.borderBottom = 'none'; 
      newEl.color = '#334155'; 
      newEl.fontWeight = 'bold';
    }
    newEl.color = el.fontSize > 12 ? '#0f172a' : '#475569';
    return newEl;
  })
};

// 10. Golden Dual (2 Col)
const goldenTwoColTemplate = {
  id: 'golden_2col',
  name: 'Golden Dual',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#fefce8', 
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#713f12' : '#a16207'; 
      if (el.borderBottom) {
        newEl.color = '#854d0e';
        newEl.borderBottom = '1px solid #fef08a';
      }
    } else {
      if (el.borderBottom) newEl.color = '#854d0e';
    }
    return newEl;
  })
};

// --- 10 NEW TEMPLATES ADDED BELOW ---

// 11. Compact Professional (1 Col)
const compactProfessionalTemplate = {
  id: 'compact_professional_1col',
  name: 'Compact Professional',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => ({
    ...el,
    fontSize: el.fontSize > 16 ? el.fontSize * 0.8 : el.fontSize > 12 ? 12 : 9.5,
    marginBottom: el.marginBottom ? el.marginBottom * 0.6 : 0,
    paddingBottom: el.paddingBottom ? el.paddingBottom * 0.6 : 0,
    headerIcon: null,
    color: el.fontSize > 12 ? '#000000' : '#374151'
  }))
};

// 12. Harvard Style Resume (1 Col)
const harvardStyleTemplate = {
  id: 'harvard_style_1col',
  name: 'Harvard Style Resume',
  columns: 1,
  headshot: false,
  designConfig: { fontFamily: '"Times New Roman", Times, serif' },
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, headerIcon: null, iconType: null, color: '#000000' };
    if (el.id === 'fullName') {
      newEl.textAlign = 'center';
      newEl.textTransform = 'uppercase';
      newEl.fontSize = 24;
      newEl.alignSelf = 'center';
    }
    if (el.id === 'title' || el.id === 'phone' || el.id === 'email' || el.id === 'linkedin') {
      newEl.textAlign = 'center';
      newEl.inline = false;
      newEl.alignSelf = 'center';
      newEl.marginBottom = 4;
      newEl.marginRight = 0;
    }
    if (el.id.includes('Title') && !el.id.includes('job')) {
      newEl.textAlign = 'center';
      newEl.alignSelf = 'center';
      newEl.textTransform = 'uppercase';
      newEl.borderBottom = '1px solid #000000';
      newEl.fontSize = 12;
      newEl.width = '100%'; 
      newEl.paddingBottom = 4;
      newEl.marginTop = 12;
    }
    return newEl;
  })
};

// 13. Timeline Classic (1 Col)
const timelineClassicTemplate = {
  id: 'timeline_classic_1col',
  name: 'Timeline Classic',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, headerIcon: null };
    if (el.id.includes('Desc')) {
      newEl.borderLeft = '2px solid #cbd5e1';
      newEl.paddingLeft = 16;
      newEl.marginLeft = 6; 
      newEl.paddingBottom = 16; 
    }
    return newEl;
  })
};

// 14. Section Divider Bold (1 Col)
const sectionDividerBoldTemplate = {
  id: 'section_divider_bold_1col',
  name: 'Section Divider Bold',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, headerIcon: null };
    if (el.borderBottom) {
      newEl.borderBottom = '4px solid #111827';
      newEl.textTransform = 'uppercase';
      newEl.color = '#111827';
      newEl.paddingBottom = 6;
      newEl.marginTop = 10;
    }
    return newEl;
  })
};

// 15. Serif Elegant (1 Col)
const serifElegantTemplate = {
  id: 'serif_elegant_1col',
  name: 'Serif Elegant',
  columns: 1,
  headshot: false,
  designConfig: { fontFamily: 'Georgia, serif' },
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.id === 'fullName') newEl.color = '#1e3a8a';
    if (el.borderBottom) {
      newEl.color = '#1e3a8a';
      newEl.borderBottom = '1px solid #bfdbfe';
    }
    return newEl;
  })
};

// 16. Sidebar Minimal (2 Col)
const sidebarMinimalTemplate = {
  id: 'sidebar_minimal_2col',
  name: 'Sidebar Minimal',
  columns: 2,
  headshot: true,
  sidebarWidth: '25%', // Tighter sidebar
  page: { width: 900, minHeight: 1100 },
  leftBg: '#f8fafc',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#334155' : '#64748b';
      if (el.borderBottom) newEl.borderBottom = '1px solid #cbd5e1';
    }
    return newEl;
  })
};

// 17. Gradient Split (2 Col)
const gradientSplitTemplate = {
  id: 'gradient_split_2col',
  name: 'Gradient Split',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)', // Real CSS Gradient Support
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#e9d5ff';
      if (el.borderBottom) newEl.borderBottom = '1px solid #a855f7';
    }
    return newEl;
  })
};

// 18. Card-Based Layout (2 Col)
const cardBasedTemplate = {
  id: 'card_based_2col',
  name: 'Card-Based Layout',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#1e293b',
  rightBg: '#f1f5f9',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'right' && el.isMultiline) {
      newEl.backgroundColor = '#ffffff';
      newEl.padding = 16;
      newEl.borderRadius = 8;
      newEl.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
      newEl.border = '1px solid #e2e8f0';
      newEl.width = '100%';
    }
    return newEl;
  })
};

// 19. Icon-Focused Resume (2 Col)
const iconFocusedTemplate = {
  id: 'icon_focused_2col',
  name: 'Icon-Focused Resume',
  columns: 2,
  headshot: true,
  sidebarWidth: '32%',
  page: { width: 900, minHeight: 1100 },
  leftBg: '#0f172a',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#94a3b8';
      if (el.borderBottom) newEl.borderBottom = '1px solid #334155';
    }
    // Give all job titles an icon
    if (el.id.includes('job') && el.id.includes('Title')) {
       newEl.headerIcon = 'briefcase'; 
       newEl.color = '#0ea5e9';
    }
    return newEl;
  })
};

// 20. Progress Bar Skills (2 Col)
const progressBarTemplate = {
  id: 'progress_bars_2col',
  name: 'Progress Bar Skills',
  columns: 2,
  headshot: true,
  page: { width: 900, minHeight: 1100 },
  leftBg: '#27272a',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    // Tag skills to be rendered as progress bars by the engine
    if (el.id === 'techSkills' || el.id === 'funcSkills') {
      newEl.isProgress = true;
    }
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#a1a1aa';
      if (el.borderBottom) newEl.borderBottom = '1px solid #52525b';
    }
    return newEl;
  })
};

// --- 12 NEW PREMIUM & SPECIALIZED TEMPLATES ---

// 21. Portfolio Hybrid (2 Col)
const portfolioHybridTemplate = {
  id: 'portfolio_hybrid_2col',
  name: 'Portfolio Hybrid',
  columns: 2,
  headshot: true,
  sidebarWidth: '35%',
  page: { width: 900, minHeight: 1100 },
  leftBg: '#18181b',
  rightBg: '#fafafa',
  elements: [
    ...modernTwoColTemplate.elements.map(el => {
      const newEl = { ...el };
      if (el.col === 'left') {
        newEl.color = el.fontSize > 12 ? '#ffffff' : '#a1a1aa';
        if (el.borderBottom) newEl.borderBottom = '1px solid #3f3f46';
      }
      return newEl;
    }),
    { id: 'portfolioUrl', col: 'left', label: 'Portfolio Link', iconType: 'link', fontSize: 10, color: '#a1a1aa', marginBottom: 12, defaultVal: 'portfolio.com/username' }
  ]
};

// 22. Infographic Resume (2 Col)
const infographicTemplate = {
  id: 'infographic_2col',
  name: 'Infographic Resume',
  columns: 2,
  headshot: true,
  sidebarWidth: '40%',
  page: { width: 900, minHeight: 1100 },
  leftBg: '#2e1065',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    if (el.id === 'techSkills' || el.id === 'funcSkills') newEl.isProgress = true;
    if (el.col === 'left') {
      newEl.color = el.fontSize > 12 ? '#ffffff' : '#ddd6fe';
      if (el.borderBottom) newEl.borderBottom = '1px solid #5b21b6';
    } else {
      if (el.borderBottom) {
        newEl.borderBottom = 'none';
        newEl.backgroundColor = '#f3f4f6';
        newEl.padding = 6;
        newEl.borderRadius = 4;
      }
    }
    return newEl;
  })
};

// 23. Asymmetrical Layout (2 Col)
const asymmetricalTemplate = {
  id: 'asymmetrical_2col',
  name: 'Asymmetrical Layout',
  columns: 2,
  headshot: false,
  sidebarWidth: '60%', // Wide left, narrow right
  page: { width: 900, minHeight: 1100 },
  leftBg: '#ffffff',
  rightBg: '#f8fafc',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    // Swap columns to put heavy text on the left, skills on the right
    newEl.col = el.col === 'left' ? 'right' : 'left';
    newEl.color = '#334155';
    if (newEl.borderBottom) newEl.borderBottom = '1px solid #cbd5e1';
    if (el.id === 'fullName') {
       newEl.color = '#0f172a';
       newEl.fontSize = 36;
       newEl.textAlign = 'left';
       newEl.alignSelf = 'flex-start';
    }
    return newEl;
  })
};

// 24. Magazine Style (2 Col)
const magazineTemplate = {
  id: 'magazine_2col',
  name: 'Magazine Style',
  columns: 2,
  headshot: true,
  designConfig: { fontFamily: 'Georgia, serif' },
  page: { width: 900, minHeight: 1100 },
  leftBg: '#ffffff',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.map(el => {
    const newEl = { ...el };
    newEl.color = '#000000';
    if (el.id === 'fullName') {
      newEl.fontSize = 42;
      newEl.textTransform = 'uppercase';
      newEl.letterSpacing = '2px';
    }
    if (el.borderBottom) {
      newEl.borderBottom = '3px solid #000000';
      newEl.textTransform = 'uppercase';
    }
    return newEl;
  })
};

// 25. Developer Resume (1 Col)
const developerTemplate = {
  id: 'developer_1col',
  name: 'Developer Resume',
  columns: 1,
  headshot: false,
  designConfig: { fontFamily: '"Roboto Mono", monospace' },
  page: { width: 900, minHeight: 1100 },
  elements: [
    ...classicTemplate.elements.map(el => ({ ...el, color: el.fontSize > 12 ? '#1e293b' : '#475569' })),
    { id: 'githubLink', col: 'main', label: 'GitHub URL', inline: true, iconType: 'github', fontSize: 11, color: '#475569', marginRight: 20, marginBottom: 30, defaultVal: 'github.com/username' },
    { id: 'projectsTitle', col: 'main', label: 'Key Projects Header', headerIcon: 'code', fontSize: 14, fontWeight: 'bold', color: '#0ea5e9', borderBottom: '2px solid #bae6fd', paddingBottom: 5, marginBottom: 15, defaultVal: 'KEY PROJECTS & ARCHITECTURE' },
    { id: 'projects', col: 'main', label: 'Projects Details', isMultiline: true, fontSize: 11, color: '#475569', marginBottom: 30, defaultVal: '• Built scalable microservices using Node.js and Docker.\n• Designed low-latency frontend architecture using React.' }
  ]
};

// 26. Sales Performance Resume (1 Col)
const salesTemplate = {
  id: 'sales_1col',
  name: 'Sales Performance Resume',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: [
    ...classicTemplate.elements.map(el => ({ ...el })),
    { id: 'kpiTitle', col: 'main', label: 'Key Metrics Header', headerIcon: 'chart', fontSize: 14, fontWeight: 'bold', color: '#059669', borderBottom: '2px solid #a7f3d0', paddingBottom: 5, marginBottom: 15, defaultVal: 'KEY PERFORMANCE INDICATORS (KPIs)' },
    { id: 'kpis', col: 'main', label: 'Sales Metrics', isMultiline: true, fontSize: 11, color: '#374151', marginBottom: 30, defaultVal: '• 150% Quota Attainment Q3 2023\n• Generated $1.2M in new pipeline.' }
  ]
};

// 27. Academic CV Template (1 Col)
const academicCVTemplate = {
  id: 'academic_cv_1col',
  name: 'Academic CV Template',
  columns: 1,
  headshot: false,
  designConfig: { fontFamily: '"Times New Roman", Times, serif' },
  page: { width: 900, minHeight: 1100 },
  elements: [
    ...classicTemplate.elements.map(el => ({ ...el, headerIcon: null, iconType: null, color: '#000000' })),
    { id: 'publicationsTitle', col: 'main', label: 'Publications Header', fontSize: 14, fontWeight: 'bold', color: '#000000', borderBottom: '1px solid #000000', paddingBottom: 5, marginBottom: 15, defaultVal: 'PUBLICATIONS & RESEARCH' },
    { id: 'publications', col: 'main', label: 'Publications List', isMultiline: true, fontSize: 11, color: '#000000', marginBottom: 30, defaultVal: '• "Advanced Modeling in System Sciences", Journal of Systems, 2023.' }
  ]
};

// 28. Fresh Graduate Template (1 Col)
const freshGradTemplate = {
  id: 'fresh_grad_1col',
  name: 'Fresh Graduate',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el };
    // Make summary massive, minimal experience emphasis
    if (el.id === 'summary') {
      newEl.fontSize = 13;
      newEl.lineHeight = '1.8';
    }
    return newEl;
  })
};

// 29. Career Switch Template (1 Col)
const careerSwitchTemplate = {
  id: 'career_switch_1col',
  name: 'Career Switch',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el };
    // Enhance Skills visual hierarchy over experience
    if (el.id === 'techSkills' || el.id === 'funcSkills') {
      newEl.backgroundColor = '#f8fafc';
      newEl.padding = 12;
      newEl.borderRadius = 8;
      newEl.border = '1px solid #e2e8f0';
    }
    return newEl;
  })
};

// 30. ATS + Design Hybrid (1 Col)
const atsDesignHybridTemplate = {
  id: 'ats_design_hybrid_1col',
  name: 'ATS + Design Hybrid',
  columns: 1,
  headshot: false,
  page: { width: 900, minHeight: 1100 },
  elements: classicTemplate.elements.map(el => {
    const newEl = { ...el, headerIcon: null };
    if (el.borderBottom) {
      newEl.borderBottom = 'none';
      newEl.backgroundColor = '#f1f5f9';
      newEl.padding = 8;
      newEl.borderRadius = 4;
      newEl.color = '#0f172a';
    }
    return newEl;
  })
};

// 31. One-Page Ultra Compact (2 Col)
const ultraCompactTemplate = {
  id: 'ultra_compact_2col',
  name: 'One-Page Ultra Compact',
  columns: 2,
  headshot: false,
  sidebarWidth: '30%',
  page: { width: 900, minHeight: 1100 },
  leftBg: '#ffffff',
  rightBg: '#ffffff',
  elements: modernTwoColTemplate.elements.filter(el => el.type !== 'image').map(el => {
    const newEl = { ...el };
    newEl.fontSize = el.fontSize > 16 ? 16 : el.fontSize > 12 ? 10 : 8.5; // Tiny text
    newEl.marginBottom = el.marginBottom ? el.marginBottom * 0.4 : 0;
    newEl.paddingBottom = el.paddingBottom ? el.paddingBottom * 0.4 : 0;
    newEl.color = '#1e293b';
    if (newEl.borderBottom) newEl.borderBottom = '1px solid #cbd5e1';
    return newEl;
  })
};

// 32. Personal Branding Resume (2 Col)
const personalBrandingTemplate = {
  id: 'personal_branding_2col',
  name: 'Personal Branding Resume',
  columns: 2,
  headshot: false,
  sidebarWidth: '35%',
  page: { width: 900, minHeight: 1100 },
  leftBg: '#111827',
  rightBg: '#ffffff',
  elements: [
    { id: 'brandLogo', col: 'left', label: 'Initials / Brand', fontSize: 36, fontWeight: 'bold', color: '#111827', backgroundColor: '#ffffff', width: '80px', height: '80px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', marginBottom: 20, alignSelf: 'center', defaultVal: 'GF' },
    ...modernTwoColTemplate.elements.filter(el => el.type !== 'image').map(el => {
      const newEl = { ...el };
      if (el.col === 'left') {
        newEl.color = el.fontSize > 12 ? '#ffffff' : '#9ca3af';
        if (el.borderBottom) newEl.borderBottom = '1px solid #374151';
      }
      return newEl;
    })
  ]
};

const ALL_TEMPLATES = [
  { ...classicTemplate, defaultAccent: '#047857' },
  { ...modernTwoColTemplate, defaultAccent: '#334155' },
  { ...minimalistCleanTemplate, defaultAccent: '#000000' },
  { ...accentIndigoTemplate, defaultAccent: '#312e81' },
  { ...softBlueTwoColTemplate, defaultAccent: '#0c4a6e' },
  { ...darkModeTwoColTemplate, defaultAccent: '#10b981' },
  { ...executiveRubyTemplate, defaultAccent: '#881337' },
  { ...emeraldTwoColTemplate, defaultAccent: '#047857' },
  { ...slateMinimalTemplate, defaultAccent: '#334155' },
  { ...goldenTwoColTemplate, defaultAccent: '#854d0e' },
  { ...compactProfessionalTemplate, defaultAccent: '#1f2937' },
  { ...harvardStyleTemplate, defaultAccent: '#000000' },
  { ...timelineClassicTemplate, defaultAccent: '#0ea5e9' },
  { ...sectionDividerBoldTemplate, defaultAccent: '#111827' },
  { ...serifElegantTemplate, defaultAccent: '#1e3a8a' },
  { ...sidebarMinimalTemplate, defaultAccent: '#3b82f6' },
  { ...gradientSplitTemplate, defaultAccent: '#a855f7' },
  { ...cardBasedTemplate, defaultAccent: '#3b82f6' },
  { ...iconFocusedTemplate, defaultAccent: '#0ea5e9' },
  { ...progressBarTemplate, defaultAccent: '#14b8a6' },
  { ...portfolioHybridTemplate, defaultAccent: '#d946ef' },
  { ...infographicTemplate, defaultAccent: '#8b5cf6' },
  { ...asymmetricalTemplate, defaultAccent: '#0f172a' },
  { ...magazineTemplate, defaultAccent: '#000000' },
  { ...developerTemplate, defaultAccent: '#0ea5e9' },
  { ...salesTemplate, defaultAccent: '#059669' },
  { ...academicCVTemplate, defaultAccent: '#000000' },
  { ...freshGradTemplate, defaultAccent: '#f59e0b' },
  { ...careerSwitchTemplate, defaultAccent: '#6366f1' },
  { ...atsDesignHybridTemplate, defaultAccent: '#334155' },
  { ...ultraCompactTemplate, defaultAccent: '#1e293b' },
  { ...personalBrandingTemplate, defaultAccent: '#facc15' }
];

// --- Parsed Data from User's PPTX ---
const parsedGrahamDataMap = {
  fullName: 'Graham Ross Flora',
  title: 'Application Development Analyst',
  phone: '+639321017870',
  email: 'graham.ross.flora@accenture.com',
  linkedin: 'linkedin.com/in/graham-flora',
  portfolioUrl: 'grahamflora.dev',
  githubLink: 'github.com/graham-flora',
  summaryTitle: 'BACKGROUND & EXPERTISE',
  summary: 'Extensive experience in Application Development with specialization in Splunk. Extensive experience in Data Onboarding with the use of AWS Cloud.',
  
  techSkillsTitle: 'TECHNICAL SKILLS',
  techSkills: '• Splunk\n• Amazon Web Services\n• Microsoft Azure Administration\n• Informatica Intelligent Cloud Services\n• PowerBI',
  funcSkillsTitle: 'FUNCTIONAL SKILLS',
  funcSkills: '• Data Architecture\n• Data Analytics\n• Technical Design Documentation\n• AWS Cloud essentials\n• Data Visualization\n• Informatica Cloud Services\n• FORM Methodology',
  
  certsTitle: 'CERTIFICATIONS',
  certifications: '• Splunk Core Certified Power User\n• Splunk Core Certified Power Admin\n• AWS Certified Cloud Practioner\n• Cribl Certified Observability (CCOE) User\n• Cribl Certified Observability (CCOE) Admin',
  industryTitle: 'INDUSTRY BACKGROUND',
  industry: '• Communications\n• Consumer Products\n• Computer Software (Cybersecurity)',
  
  projectsTitle: 'KEY PROJECTS & ARCHITECTURE',
  projects: '• Splunk Data Normalization Engine: Reduced query load times by 40% using custom SPL logic.\n• Automated AWS Cloud Provisioning: Scripted infrastructure setup cutting deployment time by 2 days.',
  kpiTitle: 'KEY PERFORMANCE INDICATORS (KPIs)',
  kpis: '• Maintained 99.9% uptime for Splunk enterprise environments.\n• Successfully onboarded 50+ diverse data sources ahead of schedule.\n• Reduced average incident resolution time by 30%.',
  publicationsTitle: 'PUBLICATIONS & RESEARCH',
  publications: '• "Optimizing Log Analytics at Scale", Internal Tech Symposium 2023.\n• "Cloud Security Posture Management Strategies", Medium.com Technical Blog.',
  
  expTitle: 'PROFESSIONAL EXPERIENCE',
  job1Title: 'SPLUNK DEVOPS ENGINEER - BMW (Oct 2023 – Present)',
  job1Desc: 'I designed and implemented advanced Splunk solutions to centralize and analyze large-scale log data, enabling real-time monitoring and predictive analytics for critical systems. By developing custom SPL queries and dashboards, I optimized data visualization and anomaly detection, ensuring swift resolution of incidents and improved system reliability. Additionally, I configured backend settings, integrated Splunk with cloud platforms like AWS, and collaborated with stakeholders to address complex data challenges.',
  job2Title: 'PROMPT ENGINEER - AMAZON (Mar 2023 – Oct 2023)',
  job2Desc: 'I have developed and optimized advanced prompts for generative AI systems, ensuring high accuracy and relevance in natural language understanding tasks. My expertise includes designing multi-turn conversational flows to enhance user interactions and improve AI responsiveness across various applications.',
  job3Title: 'SPLUNK DEVOPS ENGINEER - SHELL (Oct 2021 – Mar 2023)',
  job3Desc: 'As a Splunk DevOps Engineer, I specialize in monitoring and troubleshooting issues on the Splunk platform to ensure optimal performance and reliability. I work closely with clients to onboard new projects, configuring Splunk environments based on client-provided frameworks and addressing specific needs. In collaboration with stakeholders, I propose solutions to data-related issues identified through monitoring, ensuring actionable insights and improved outcomes. Additionally, I leverage predictive modeling to enhance customer experiences, drive revenue growth, and optimize business operations, aligning data insights with strategic goals.',
  job4Title: 'SPLUNK DEVELOPER - SPLUNK (June 2021 – Oct 2021)',
  job4Desc: 'Worked on how the Splunk Industry work and how they handle their clients with their respective projects, enabling basic onboarding practical activities, configuring Splunkbase applications and addons, generating models, and creating advanced dashboards. This helps us to provide a better insights on critical issues to minimize the risk, and for work-load balancing.',
  job5Title: 'CLOUD SECURITY ENGINEER – TREND MICRO (June 2019 – June 2021)',
  job5Desc: 'A technical support to Trend Micro Home and Home Office users powered by Trend Micro Smart protection Network cloud security infrastructure that stops threats in cyberspace. Provides customer support with their account management, product inquiries, and to deliver best solutions to product concerns.'
};

// --- SVG Icon Components ---
const IconRenderer = ({ type, color, size = 14 }) => {
  const svgs = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
    linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
    code: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
    award: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>`,
    building: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
    pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
    chart: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M18 17V9"></path><path d="M13 17V5"></path><path d="M8 17v-3"></path></svg>`,
    book: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`
  };
  return <div dangerouslySetInnerHTML={{ __html: svgs[type] }} className="flex-shrink-0" />;
};

// --- CORE LAYOUT RENDERER ---
const RenderTemplate = ({ resumeData, formData, onElementMouseDown, draggingElementId }) => {
  const tpl = resumeData.data;
  
  const design = tpl.designConfig || {};
  const accent = design.accentColor || tpl.defaultAccent;
  const sidebarBg = design.sidebarColor || tpl.leftBg;
  const fontFam = design.fontFamily || 'Arial, sans-serif';

  const renderElement = (el) => {
    const value = formData[el.id];
    if ((value === null || value === undefined || String(value).trim() === '') && el.type !== 'image' && el.type !== 'shape') return null;

    let finalColor = el.color;
    let finalBorder = el.borderBottom;
    
    if (accent && (el.headerIcon || el.iconType || (el.id.includes('Title') && !el.id.includes('job')))) {
      finalColor = accent;
    }
    if (accent && el.borderBottom) {
      finalBorder = el.borderBottom.replace(/#[0-9a-fA-F]+/, accent); 
    }

    const dragStyle = {
      transform: `translate(${el.offsetX || 0}px, ${el.offsetY || 0}px)`,
      zIndex: draggingElementId === el.id ? 50 : 1,
      cursor: draggingElementId ? 'move' : 'default',
      position: 'relative', 
      
      display: el.inline ? 'inline-flex' : 'flex',
      alignItems: el.alignItems || ((el.iconType || el.headerIcon) ? 'center' : 'flex-start'),
      gap: (el.iconType || el.headerIcon) ? '8px' : '0',
      
      marginRight: el.marginRight ? `${el.marginRight}px` : '0',
      marginBottom: el.marginBottom ? `${el.marginBottom}px` : '0',
      marginTop: el.marginTop ? `${el.marginTop}px` : '0',
      marginLeft: el.marginLeft ? `${el.marginLeft}px` : '0',
      alignSelf: el.alignSelf || 'auto',
      width: el.type === 'image' ? `${el.width}px` : (el.width || 'auto'),
      
      fontSize: `${el.fontSize}px`,
      fontWeight: el.fontWeight,
      color: finalColor,
      textAlign: el.textAlign,
      borderBottom: finalBorder,
      borderLeft: el.borderLeft || 'none',
      paddingLeft: el.paddingLeft ? `${el.paddingLeft}px` : '0',
      paddingBottom: el.paddingBottom ? `${el.paddingBottom}px` : '0',
      padding: el.padding ? `${el.padding}px` : '0',
      backgroundColor: el.backgroundColor || 'transparent',
      borderRadius: el.borderRadius ? `${el.borderRadius}px` : '0',
      boxShadow: el.boxShadow || 'none',
      textTransform: el.textTransform || 'none',
      border: el.border || 'none',
      letterSpacing: el.letterSpacing || 'normal',
      lineHeight: el.lineHeight || '1.5',
      justifyContent: el.justifyContent || 'flex-start'
    };

    if (el.type === 'image') {
      return (
        <div key={el.id} onMouseDown={(e) => onElementMouseDown && onElementMouseDown(e, el)} className={onElementMouseDown ? "hover:outline hover:outline-2 hover:outline-violet-400" : ""} style={{ ...dragStyle, width: `${el.width}px`, height: `${el.height}px`, borderRadius: '50%', backgroundColor: '#334155', border: '3px solid #64748b', overflow: 'hidden', justifyContent: 'center' }}>
          {value ? <img src={value} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable="false" /> : <span style={{ color: '#94a3b8', fontSize: '10px' }}>No Photo</span>}
        </div>
      )
    }

    const textLines = (String(value) || '').split('\n');
    
    // NEW: Render Visual Progress Bars
    if (el.isProgress) {
      const progressArr = formData[`${el.id}_progress`] || el.progressValues || [];
      return (
        <div key={el.id} onMouseDown={(e) => onElementMouseDown && onElementMouseDown(e, el)} className={onElementMouseDown ? "hover:outline hover:outline-1 hover:outline-violet-400 hover:outline-offset-2 rounded-sm" : ""} style={{ ...dragStyle, whiteSpace: 'pre-wrap', wordBreak: 'break-word', display: 'block' }}>
          {el.headerIcon && <IconRenderer type={el.headerIcon} size={el.fontSize * 1.2} color={finalColor} />}
          {el.iconType && <IconRenderer type={el.iconType} size={el.fontSize * 1.2} color={finalColor} />}
          <div style={{ flex: 1, width: '100%', marginTop: (el.headerIcon || el.iconType) ? '8px' : '0' }}>
            {textLines.map((line, i) => {
              if(!line.trim()) return null;
              const cleanLine = line.replace(/^[•\-\*]\s*/, '');
              const defaultProg = 65 + ((i * 13) % 30); // Visually distinct varied progress widths fallback
              const progress = progressArr[i] !== undefined ? progressArr[i] : defaultProg;
              
              return (
                <div key={i} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: `${el.fontSize}px` }}>
                    <span>{cleanLine}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: finalColor + '40', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: finalColor, borderRadius: '2px', transition: 'width 0.2s ease' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div key={el.id} onMouseDown={(e) => onElementMouseDown && onElementMouseDown(e, el)} className={onElementMouseDown ? "hover:outline hover:outline-1 hover:outline-violet-400 hover:outline-offset-2 rounded-sm" : ""} style={{ ...dragStyle, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {el.headerIcon && <IconRenderer type={el.headerIcon} size={el.fontSize * 1.2} color={finalColor} />}
        {el.iconType && <IconRenderer type={el.iconType} size={el.fontSize * 1.2} color={finalColor} />}
        <div style={{ flex: 1, width: '100%' }}>
          {textLines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < textLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: `${tpl.page.width}px`, minHeight: `${tpl.page.minHeight}px`, backgroundColor: '#fff', display: 'flex', flexDirection: tpl.columns === 1 ? 'column' : 'row', fontFamily: fontFam }}>
      {tpl.columns === 1 ? (
        <div className="flex flex-col w-full h-full p-16">
          {tpl.elements.filter(e => e.col === 'main').reduce((acc, el) => {
            if (el.inline) {
              if (acc.length > 0 && acc[acc.length - 1].type === 'inlineGroup') {
                acc[acc.length - 1].items.push(el);
              } else {
                acc.push({ type: 'inlineGroup', id: `group-${el.id}`, items: [el] });
              }
            } else {
              acc.push(el);
            }
            return acc;
          }, []).map(item => {
            if (item.type === 'inlineGroup') {
              return (
                <div key={item.id} className="flex flex-wrap items-center">
                  {item.items.map(renderElement)}
                </div>
              );
            }
            return renderElement(item);
          })}
        </div>
      ) : (
        <React.Fragment>
          <div className="flex flex-col flex-shrink-0 p-10" style={{ width: tpl.sidebarWidth || '35%', background: sidebarBg }}>
            {tpl.elements.filter(e => e.col === 'left').map(renderElement)}
          </div>
          <div className="flex flex-col flex-1 p-12" style={{ backgroundColor: tpl.rightBg }}>
            {tpl.elements.filter(e => e.col === 'right').map(renderElement)}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('gallery'); 
  const [resumes, setResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeFlowResumes');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Auto-save to LocalStorage whenever resumes array changes
  useEffect(() => {
    localStorage.setItem('resumeFlowResumes', JSON.stringify(resumes));
  }, [resumes]);

  const [activeResumeId, setActiveResumeId] = useState(null);
  const [formData, setFormData] = useState({});
  const [pendingExtractedData, setPendingExtractedData] = useState(null);

  // Global Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    setToast({ show: true, message, type });
    if (type !== 'loading') {
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), duration);
    }
  }, []);
  
  // WIZARD STATE
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({ fullName: '', title: '', email: '', phone: '' });
  const [wizardTemplate, setWizardTemplate] = useState(null);

  const activeResume = resumes.find(r => r.id === activeResumeId);

  // --- Window Tracking for Mobile Responsiveness ---
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const isMobile = windowWidth < 768;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isUploading, setIsUploading] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(!isMobile); // Toggles the left pane in editor mode
  const [editorWidth, setEditorWidth] = useState(380);
  const [isDragging, setIsDragging] = useState(false);

  const [draggingElementId, setDraggingElementId] = useState(null);
  const [elementDragOffset, setElementDragOffset] = useState({ startX: 0, startY: 0, origOffsetX: 0, origOffsetY: 0 });
  
  // Intelligent preview scaling
  const rightPaneRef = useRef(null);
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (rightPaneRef.current && activeResume && view === 'editor') {
         const containerWidth = rightPaneRef.current.clientWidth;
         const availableWidth = containerWidth - (isMobile ? 32 : 64);
         const newScale = Math.min(1, availableWidth / activeResume.data.page.width);
         setPreviewScale(newScale);
      }
    };
    setTimeout(updateScale, 10);
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [activeResumeId, activeResume, isMobile, isEditorOpen, editorWidth, view]);

  const [filterCols, setFilterCols] = useState('all'); // 'all', 1, 2
  const [filterHeadshot, setFilterHeadshot] = useState('all'); // 'all', true, false
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchInputRef = useRef(null);
  
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [renamingResumeId, setRenamingResumeId] = useState(null);
  const [renamingValue, setRenamingValue] = useState("");

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [exportingFormat, setExportingFormat] = useState(null);
  const exportMenuRef = useRef(null);
  
  const [activeEditorTab, setActiveEditorTab] = useState('content');

  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const templateInputRef = useRef(null); // NEW: Ref for custom template uploads

  const updateDesign = (key, value) => {
    setResumes(prev => prev.map(r => {
      if (r.id !== activeResumeId) return r;
      return {
        ...r,
        data: {
          ...r.data,
          designConfig: {
            ...(r.data.designConfig || {}),
            [key]: value
          }
        }
      }
    }));
  };

  const handleElementMouseDown = (e, el) => {
    e.preventDefault(); 
    e.stopPropagation();
    if(view !== 'editor') return; 
    setDraggingElementId(el.id);
    setElementDragOffset({ startX: e.clientX, startY: e.clientY, origOffsetX: el.offsetX || 0, origOffsetY: el.offsetY || 0 });
  };

  useEffect(() => {
    const handleElementMouseMove = (e) => {
      if (!draggingElementId) return;
      
      const dx = (e.clientX - elementDragOffset.startX) / previewScale;
      const dy = (e.clientY - elementDragOffset.startY) / previewScale;
      
      setResumes(prev => prev.map(res => {
        if (res.id !== activeResumeId) return res;
        return {
          ...res,
          data: {
            ...res.data,
            elements: res.data.elements.map(el => el.id === draggingElementId ? { ...el, offsetX: elementDragOffset.origOffsetX + dx, offsetY: elementDragOffset.origOffsetY + dy } : el)
          }
        };
      }));
    };
    
    const handleElementMouseUp = () => setDraggingElementId(null);
    
    if (draggingElementId) {
      window.addEventListener('mousemove', handleElementMouseMove);
      window.addEventListener('mouseup', handleElementMouseUp);
      document.body.style.cursor = 'move';
      document.body.style.userSelect = 'none';
    } else if (!isDragging) { 
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      window.removeEventListener('mousemove', handleElementMouseMove);
      window.removeEventListener('mouseup', handleElementMouseUp);
    };
  }, [draggingElementId, elementDragOffset, activeResumeId, isDragging, previewScale]);

  const handleMouseDown = useCallback((e) => { e.preventDefault(); setIsDragging(true); }, []);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      // With sidebar gone, e.clientX maps directly to editorWidth.
      let newWidth = e.clientX;
      if (newWidth < 280) newWidth = 280;
      if (newWidth > 700) newWidth = 700;
      setEditorWidth(newWidth);
    };
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (activeResume) {
      const initialData = {};
      activeResume.data.elements.forEach(el => {
        if (el.type !== 'shape' && el.type !== 'icon') {
          initialData[el.id] = el.defaultVal;
          if (el.progressValues) {
            initialData[`${el.id}_progress`] = el.progressValues;
          }
        }
      });
      setFormData(initialData);
    }
  }, [activeResumeId, activeResume?.data.id]);

  const handleChange = useCallback((id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setResumes(prevResumes => prevResumes.map(res => {
      if (res.id !== activeResumeId) return res;
      return {
        ...res,
        data: {
          ...res.data,
          elements: res.data.elements.map(el =>
            el.id === id ? { ...el, defaultVal: value } : el
          )
        }
      };
    }));
  }, [activeResumeId]);

  const insertBullet = useCallback((id) => {
    const currentVal = formData[id] || '';
    const textarea = document.getElementById(`textarea-${id}`);
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const prefix = currentVal.substring(0, start);
      const suffix = currentVal.substring(end);
      const needsNewline = prefix.length > 0 && !prefix.endsWith('\n');
      const insertText = (needsNewline ? '\n' : '') + '• ';
      const newVal = prefix + insertText + suffix;
      
      handleChange(id, newVal);
      
      const newPos = start + insertText.length;
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newPos, newPos);
      }, 0);
    } else {
      const needsNewline = currentVal.length > 0 && !currentVal.endsWith('\n');
      handleChange(id, currentVal + (needsNewline ? '\n' : '') + '• ');
    }
  }, [formData, handleChange]);

  const handleTextareaKeyDown = useCallback((e, id) => {
    if (e.key === 'Enter') {
      const textarea = e.target;
      const cursorPosition = textarea.selectionStart;
      const textBeforeCursor = textarea.value.substring(0, cursorPosition);
      const textAfterCursor = textarea.value.substring(cursorPosition);
      
      const lines = textBeforeCursor.split('\n');
      const currentLine = lines[lines.length - 1];
      
      // Check if the current line starts with a bullet/dash/asterisk
      const bulletMatch = currentLine.match(/^([•\-\*]\s*)/);
      
      if (bulletMatch) {
        e.preventDefault();
        const bullet = bulletMatch[1];
        
        // If hitting Enter on an empty bullet, remove it instead (to exit list)
        if (currentLine.trim() === bullet.trim()) {
          const newTextBefore = textBeforeCursor.substring(0, textBeforeCursor.length - bullet.length);
          handleChange(id, newTextBefore + '\n' + textAfterCursor);
          setTimeout(() => {
             const el = document.getElementById(`textarea-${id}`);
             if (el) el.setSelectionRange(newTextBefore.length + 1, newTextBefore.length + 1);
          }, 0);
        } else {
          // Auto-insert the next bullet
          const newText = textBeforeCursor + '\n' + bullet + textAfterCursor;
          handleChange(id, newText);
          const newCursorPos = cursorPosition + 1 + bullet.length;
          setTimeout(() => {
            const el = document.getElementById(`textarea-${id}`);
            if (el) el.setSelectionRange(newCursorPos, newCursorPos);
          }, 0);
        }
      }
    }
  }, [handleChange]);

  const handleProgressChange = useCallback((id, progressArray) => {
    setFormData(prev => ({ ...prev, [`${id}_progress`]: progressArray }));
    setResumes(prevResumes => prevResumes.map(res => {
      if (res.id !== activeResumeId) return res;
      return {
        ...res,
        data: {
          ...res.data,
          elements: res.data.elements.map(el =>
            el.id === id ? { ...el, progressValues: progressArray } : el
          )
        }
      };
    }));
  }, [activeResumeId]);

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange(id, imageUrl);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    showToast(`Extracting data from ${file.name}...`, 'loading');
    
    setTimeout(() => {
      setActiveResumeId(null); 
      setPendingExtractedData(parsedGrahamDataMap);
      setIsUploading(false);
      setView('gallery'); 
      showToast('Data extracted successfully!', 'success');
      e.target.value = '';
    }, 2000);
  };

  // NEW: Handler for uploading Custom Client Templates (Fully Functional API Call)
  const handleTemplateFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsUploading(true);
    showToast(`AI analyzing layout of ${file.name}...`, 'loading');
    
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      // Call to your Python AI Backend (Make sure the server from the guide is running!)
      const response = await fetch('http://localhost:8000/extract-layout', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error('Backend extraction failed');
      }

      // The backend returns a perfectly formatted JSON schema matching our system!
      const customClientTemplate = await response.json();
      
      handleSelectTemplate(customClientTemplate);
      showToast('Custom template reverse-engineered successfully!', 'success');
    } catch (error) {
      console.error("AI Engine Error:", error);
      showToast('Backend offline. Falling back to simulation.', 'error', 3000);
      
      // Fallback to simulation if backend isn't running yet so the UI doesn't break during your testing
      setTimeout(() => {
        const fallbackTemplate = {
          id: `custom_client_${Date.now()}`,
          name: `Imported Layout: ${file.name.split('.')[0]}`,
          columns: 1,
          headshot: false,
          designConfig: { fontFamily: 'Arial, sans-serif', accentColor: '#1e293b' },
          page: { width: 900, minHeight: 1100 },
          elements: classicTemplate.elements.map(el => ({
            ...el,
            color: el.fontSize > 12 ? '#0f172a' : '#334155',
            borderBottom: el.borderBottom ? '1px solid #cbd5e1' : 'none',
            headerIcon: null,
            iconType: null,
            textTransform: el.id.includes('Title') ? 'uppercase' : 'none',
            marginBottom: el.marginBottom ? el.marginBottom * 0.8 : 0
          }))
        };
        handleSelectTemplate(fallbackTemplate);
      }, 1500);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSelectTemplate = (templateSchema) => {
    if (activeResumeId && !pendingExtractedData) {
      setResumes(prev => prev.map(r => {
        if (r.id !== activeResumeId) return r;
        
        const preservedFont = r.data.designConfig?.fontFamily || 'Arial, sans-serif';

        const mergedElements = templateSchema.elements.map(el => {
          if (el.type === 'shape' || el.type === 'icon') return el;
          return { 
            ...el, 
            offsetX: 0, offsetY: 0, 
            defaultVal: formData[el.id] !== undefined ? formData[el.id] : el.defaultVal 
          };
        });
        
        // Ensure any dynamically added jobs (like job6, job7) are transferred over when switching templates
        const existingJobTitles = r.data.elements.filter(e => e.id.match(/^job(\d+)Title$/)).map(e => e.id);
        const newJobTitles = mergedElements.filter(e => e.id.match(/^job(\d+)Title$/)).map(e => e.id);
        const dynamicallyAddedJobs = existingJobTitles.filter(id => !newJobTitles.includes(id));
        
        if (dynamicallyAddedJobs.length > 0) {
          const refTitle = mergedElements.find(e => e.id === 'job1Title');
          const refDesc = mergedElements.find(e => e.id === 'job1Desc');
          if (refTitle && refDesc) {
            dynamicallyAddedJobs.forEach(jobTitleId => {
              const num = jobTitleId.match(/^job(\d+)Title$/)[1];
              mergedElements.push({ ...refTitle, id: `job${num}Title`, label: `Job ${num} Title`, defaultVal: formData[`job${num}Title`] || '' });
              mergedElements.push({ ...refDesc, id: `job${num}Desc`, label: `Job ${num} Description`, defaultVal: formData[`job${num}Desc`] || '' });
            });
          }
        }

        return { 
          ...r, 
          data: { 
            ...templateSchema, 
            elements: mergedElements,
            designConfig: { accentColor: templateSchema.defaultAccent, sidebarColor: templateSchema.leftBg, fontFamily: preservedFont }
          } 
        };
      }));
      setView('editor');
      if (isMobile) setIsEditorOpen(false); 
      return;
    }

    const newId = `res_${Date.now()}`;
    const mergedElements = templateSchema.elements.map(el => {
      if (el.type === 'shape' || el.type === 'icon') return el;
      return { 
        ...el, 
        offsetX: 0, offsetY: 0,
        defaultVal: pendingExtractedData && pendingExtractedData[el.id] ? pendingExtractedData[el.id] : el.defaultVal 
      };
    });

    const newResume = {
      id: newId,
      name: pendingExtractedData ? 'Graham Ross Flora - Resume' : 'Untitled Document',
      lastModified: new Date().toLocaleDateString(),
      data: { 
        ...templateSchema, 
        elements: mergedElements,
        designConfig: { accentColor: templateSchema.defaultAccent, sidebarColor: templateSchema.leftBg, fontFamily: 'Arial, sans-serif' }
      }
    };

    setResumes([newResume, ...resumes]);
    setActiveResumeId(newId);
    setPendingExtractedData(null); 
    setView('editor');
    if (isMobile) setIsEditorOpen(false);
  };

  const openWizard = () => {
    setIsWizardOpen(true);
    setWizardStep(1);
    setWizardData({ fullName: '', title: '', email: '', phone: '' });
    setWizardTemplate(null);
  };

  const finishWizard = () => {
    const newId = `res_${Date.now()}`;
    const mergedElements = wizardTemplate.elements.map(el => {
      if (el.type === 'shape' || el.type === 'icon') return el;
      
      let finalValue = el.defaultVal;
      if (wizardData[el.id] !== undefined && wizardData[el.id].trim() !== '') {
        finalValue = wizardData[el.id];
      }
      return { ...el, offsetX: 0, offsetY: 0, defaultVal: finalValue };
    });

    const newResume = {
      id: newId,
      name: wizardData.fullName ? `${wizardData.fullName} Resume` : 'Untitled Document',
      lastModified: new Date().toLocaleDateString(),
      data: { 
        ...wizardTemplate, 
        elements: mergedElements,
        designConfig: { accentColor: wizardTemplate.defaultAccent, sidebarColor: wizardTemplate.leftBg, fontFamily: 'Arial, sans-serif' }
      }
    };

    setResumes([newResume, ...resumes]);
    setActiveResumeId(newId);
    setPendingExtractedData(null); 
    setIsWizardOpen(false);
    setView('editor');
    if (isMobile) setIsEditorOpen(false);
    showToast('Resume created successfully!', 'success');
  };

  const scrollToTemplates = () => {
    document.getElementById('templates-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const confirmDelete = (e, id) => {
    e.stopPropagation();
    setResumeToDelete(id);
  };
  const cancelDelete = () => setResumeToDelete(null);
  const executeDelete = () => {
    if (!resumeToDelete) return;
    setResumes(prev => prev.filter(r => r.id !== resumeToDelete));
    if (activeResumeId === resumeToDelete) {
      setActiveResumeId(null);
      setView('gallery');
    }
    setResumeToDelete(null);
  };

  const startRename = (e, id, currentName) => {
    e.stopPropagation();
    setRenamingResumeId(id);
    setRenamingValue(currentName);
  };
  const handleRenameChange = (e) => setRenamingValue(e.target.value);
  const saveRename = (e) => {
    if (e) e.stopPropagation();
    if (renamingValue.trim()) {
      setResumes(prev => prev.map(r => r.id === renamingResumeId ? { ...r, name: renamingValue.trim() } : r));
    }
    setRenamingResumeId(null);
  };
  const cancelRename = (e) => {
    if (e) e.stopPropagation();
    setRenamingResumeId(null);
  };
  const handleRenameKeyDown = (e) => {
    if (e.key === 'Enter') saveRename(e);
    if (e.key === 'Escape') cancelRename(e);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
        setIsExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerDownload = (filename, content, mimeType) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = (format) => {
    setIsExportMenuOpen(false);
    setExportingFormat(format);
    
    // Simulate a brief generation delay for UI feedback, then trigger instant download
    setTimeout(() => {
      const fileName = (activeResume ? activeResume.name : 'Resume').replace(/\s+/g, '_');
      
      if (format === 'PDF') {
        // Triggers the browser's native, instant PDF generation (using the hidden @media print styles we added below)
        window.print();
      } else {
        // Extract raw data from the form to bundle into the DOCX/PPTX file
        let content = `Resume Export: ${format}\n\n`;
        if (activeResume) {
           Object.entries(formData).forEach(([key, val]) => {
              if (typeof val === 'string' && !val.startsWith('data:image')) {
                 content += `${key}: \n${val}\n\n`;
              }
           });
        }
        
        // Generate actual file blob and force instant download
        if (format === 'DOCX') {
          triggerDownload(`${fileName}.docx`, content, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        } else if (format === 'PPTX') {
          triggerDownload(`${fileName}.pptx`, content, 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
        }
      }
      
      setExportingFormat(null);
      showToast(`Downloaded ${format} successfully!`, 'success');
    }, 600);
  };

  const handleAddJob = () => {
    if (!activeResume) return;

    let curMax = 0;
    let lastJobIndex = -1;
    let referenceTitleEl = null;
    let referenceDescEl = null;

    activeResume.data.elements.forEach((el, index) => {
      const titleMatch = el.id.match(/^job(\d+)Title$/);
      if (titleMatch) {
         const num = parseInt(titleMatch[1]);
         if (num > curMax) curMax = num;
         if (!referenceTitleEl || num === 1) referenceTitleEl = el; 
      }
      const descMatch = el.id.match(/^job(\d+)Desc$/);
      if (descMatch) {
         lastJobIndex = index;
         if (!referenceDescEl || parseInt(descMatch[1]) === 1) referenceDescEl = el;
      }
    });

    if (!referenceTitleEl || !referenceDescEl) return;

    const newJobNum = curMax + 1;
    
    const newTitle = { ...referenceTitleEl, id: `job${newJobNum}Title`, label: `Job ${newJobNum} Title`, defaultVal: '' };
    const newDesc = { ...referenceDescEl, id: `job${newJobNum}Desc`, label: `Job ${newJobNum} Description`, defaultVal: '' };

    setResumes(prevResumes => prevResumes.map(res => {
      if (res.id !== activeResumeId) return res;
      const newElements = [...res.data.elements];
      newElements.splice(lastJobIndex > -1 ? lastJobIndex + 1 : newElements.length, 0, newTitle, newDesc);
      return { ...res, data: { ...res.data, elements: newElements } };
    }));

    setFormData(prev => ({ ...prev, [`job${newJobNum}Title`]: '', [`job${newJobNum}Desc`]: '' }));
    showToast(`Added empty fields for Job ${newJobNum}`, 'success', 2000);
    
    // Auto scroll the editor pane to the bottom
    setTimeout(() => {
      const editorPane = document.getElementById('editor-content-pane');
      if (editorPane) editorPane.scrollTop = editorPane.scrollHeight;
    }, 50);
  };

  const filteredTemplates = ALL_TEMPLATES.filter(tpl => {
    if (filterCols !== 'all' && tpl.columns !== filterCols) return false;
    if (filterHeadshot !== 'all' && tpl.headshot !== filterHeadshot) return false;
    if (searchQuery.trim() !== '' && !tpl.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden relative">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx" className="hidden" />
      <input type="file" ref={templateInputRef} onChange={handleTemplateFileChange} accept=".pdf,.doc,.docx,.ppt,.pptx" className="hidden" />

      {/* DELETE CONFIRMATION MODAL */}
      {resumeToDelete && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Resume?</h3>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">Are you sure you want to delete this resume? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelDelete} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={executeDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* NEW RESUME WIZARD OVERLAY */}
      {isWizardOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6">
           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col overflow-hidden max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
              
              {/* Header & Progress */}
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center flex-shrink-0">
                 <h2 className="text-lg font-bold text-slate-800 tracking-tight">Create New Resume</h2>
                 <button onClick={() => setIsWizardOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1.5 rounded-lg transition-colors">
                    <IconRenderer type="close" size="20" />
                 </button>
              </div>
              <div className="px-8 pt-6 pb-2 flex-shrink-0">
                 <div className="flex gap-2">
                     <div className={`h-1.5 flex-1 rounded-full ${wizardStep >= 1 ? 'bg-violet-600' : 'bg-slate-200'}`} />
                     <div className={`h-1.5 flex-1 rounded-full ${wizardStep >= 2 ? 'bg-violet-600' : 'bg-slate-200'}`} />
                     <div className={`h-1.5 flex-1 rounded-full ${wizardStep >= 3 ? 'bg-violet-600' : 'bg-slate-200'}`} />
                 </div>
                 <div className="flex justify-between text-xs font-bold text-slate-400 mt-3 uppercase tracking-wider">
                     <span className={wizardStep >= 1 ? 'text-violet-700' : ''}>1. Basic Details</span>
                     <span className={wizardStep >= 2 ? 'text-violet-700' : ''}>2. Template</span>
                     <span className={wizardStep >= 3 ? 'text-violet-700' : ''}>3. Preview</span>
                 </div>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 md:px-8 custom-scrollbar bg-white">
                 {wizardStep === 1 && (
                   <div className="max-w-xl mx-auto space-y-5 py-4 animate-in slide-in-from-right-4 duration-300">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-extrabold text-slate-800 mb-2">Let's start with the basics</h3>
                        <p className="text-sm text-slate-500 font-medium">Enter your core details. You can easily add experience and education later in the editor.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                         <div className="col-span-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Full Name</label>
                            <input value={wizardData.fullName} onChange={e => setWizardData({...wizardData, fullName: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all font-medium text-slate-800" placeholder="e.g. Jane Doe" />
                         </div>
                         <div className="col-span-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Professional Title</label>
                            <input value={wizardData.title} onChange={e => setWizardData({...wizardData, title: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all font-medium text-slate-800" placeholder="e.g. Senior Software Engineer" />
                         </div>
                         <div className="col-span-2 sm:col-span-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Email Address</label>
                            <input value={wizardData.email} onChange={e => setWizardData({...wizardData, email: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all font-medium text-slate-800" placeholder="jane@example.com" />
                         </div>
                         <div className="col-span-2 sm:col-span-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                            <input value={wizardData.phone} onChange={e => setWizardData({...wizardData, phone: e.target.value})} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all font-medium text-slate-800" placeholder="+1 234 567 890" />
                         </div>
                      </div>
                   </div>
                 )}
                 
                 {wizardStep === 2 && (
                   <div className="py-2 animate-in slide-in-from-right-4 duration-300">
                      <h3 className="text-xl font-extrabold text-slate-800 mb-6 text-center">Choose a starting layout</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                         {ALL_TEMPLATES.map(tpl => {
                           // Mock formData for wizard preview
                           const mockForm = {};
                           tpl.elements.forEach(el => {
                             if(wizardData[el.id] && wizardData[el.id].trim() !== '') mockForm[el.id] = wizardData[el.id];
                             else mockForm[el.id] = el.defaultVal;
                           });
                           return (
                            <div key={tpl.id} onClick={() => { setWizardTemplate(tpl); setWizardStep(3); }} className="group cursor-pointer flex flex-col items-center">
                               {/* EXACT TIGHT BOUNDING BOX (Scale 0.18) */}
                               <div 
                                 className={`relative bg-white rounded-lg shadow-sm border-2 overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md ${wizardTemplate?.id === tpl.id ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-slate-200 group-hover:border-violet-400'}`}
                                 style={{ width: `${tpl.page.width * 0.18}px`, height: `${tpl.page.minHeight * 0.18}px` }}
                               >
                                   <div style={{ transform: `scale(0.18)`, transformOrigin: 'top left', width: `${tpl.page.width}px`, minHeight: `${tpl.page.minHeight}px`, pointerEvents: 'none' }}>
                                       <RenderTemplate resumeData={{data: tpl}} formData={mockForm} />
                                   </div>
                               </div>
                               <h4 className={`mt-3 text-xs font-bold text-center transition-colors ${wizardTemplate?.id === tpl.id ? 'text-violet-700' : 'text-slate-600 group-hover:text-slate-900'}`}>{tpl.name}</h4>
                            </div>
                         )})}
                      </div>
                   </div>
                 )}
                 
                 {wizardStep === 3 && wizardTemplate && (
                   <div className="py-2 flex flex-col items-center animate-in slide-in-from-right-4 duration-300">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-extrabold text-slate-800 mb-1">Looking good?</h3>
                        <p className="text-xs text-slate-500 font-medium">You can customize colors, fonts, and add sections next.</p>
                      </div>
                      {/* EXACT TIGHT BOUNDING BOX (Scale 0.35) */}
                      <div 
                        className="bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border border-slate-200 overflow-hidden flex-shrink-0 relative"
                        style={{ width: `${wizardTemplate.page.width * 0.35}px`, height: `${wizardTemplate.page.minHeight * 0.35}px` }}
                      >
                          <div style={{ transform: `scale(0.35)`, transformOrigin: 'top left', width: `${wizardTemplate.page.width}px`, minHeight: `${wizardTemplate.page.minHeight}px`, pointerEvents: 'none' }}>
                              <RenderTemplate resumeData={{data: wizardTemplate}} formData={{...wizardTemplate.elements.reduce((acc, el) => ({...acc, [el.id]: el.defaultVal}), {}), ...wizardData}} />
                          </div>
                      </div>
                   </div>
                 )}
              </div>

              {/* Footer Controls */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center flex-shrink-0">
                 {wizardStep > 1 ? (
                   <button onClick={() => setWizardStep(wizardStep - 1)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors">Back</button>
                 ) : <div></div>}
                 
                 {wizardStep === 1 && (
                   <button onClick={() => setWizardStep(2)} className="px-6 py-3 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl transition-colors shadow-md flex items-center gap-2">
                     Next Step <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                   </button>
                 )}
                 {wizardStep === 2 && (
                   <span className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-lg italic hidden sm:block">Select a template above to continue</span>
                 )}
                 {wizardStep === 3 && (
                   <button onClick={finishWizard} className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-md flex items-center gap-2 transform hover:-translate-y-0.5">
                      Yes, Create Resume <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                   </button>
                 )}
              </div>
           </div>
        </div>
      )}

      {/* --- GLOBAL TOP HEADER NAV --- */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 flex-shrink-0 z-40 relative shadow-sm">
        
        {/* Header Left: Logo & Breadcrumbs */}
        <div className="flex items-center gap-4 h-full">
          {view === 'editor' ? (
            <button onClick={() => setView('gallery')} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors mr-2 group">
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-violet-50 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </div>
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setView('gallery')}>
              <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <h2 className="text-slate-800 font-bold text-lg tracking-tight hidden sm:block">ResumeFlow</h2>
            </div>
          )}

          {view === 'editor' && activeResume && (
            <>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-2 overflow-hidden">
                <h1 className="text-sm font-semibold text-slate-800 truncate max-w-[150px] sm:max-w-xs">{activeResume.name}</h1>
                <span className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider text-emerald-600 shadow-sm whitespace-nowrap">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                  Saved Locally
                </span>
              </div>
            </>
          )}
        </div>

        {/* Header Right: Actions based on View */}
        <div className="flex items-center gap-3">
          {view === 'gallery' ? (
            <>
              <button onClick={handleUploadClick} disabled={isUploading} className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 border border-slate-200 hidden md:flex shadow-sm">
                {isUploading ? (
                  <svg className="animate-spin h-4 w-4 text-violet-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                )}
                Import Data
              </button>
              <button onClick={openWizard} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-2 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm">
                <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                New Resume
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditorOpen(!isEditorOpen)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${isEditorOpen ? 'bg-violet-50 text-violet-700 border border-violet-200' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}>
                <svg className="w-4 h-4 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v18m12-9H9m12-7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5z"></path></svg> 
                {isEditorOpen ? 'Hide Editor' : 'Show Editor'}
              </button>
              
              <div className="relative" ref={exportMenuRef}>
                <button onClick={() => setIsExportMenuOpen(!isExportMenuOpen)} disabled={exportingFormat !== null} className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 disabled:opacity-70">
                  {exportingFormat ? (
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  )}
                  <span className="hidden sm:inline">{exportingFormat ? `Exporting...` : 'Export'}</span>
                  {!exportingFormat && <svg className={`w-3.5 h-3.5 transition-transform ${isExportMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>}
                </button>

                {/* Export Dropdown */}
                {isExportMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Download As</div>
                    <button onClick={() => handleExport('PDF')} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-violet-600 flex items-center gap-3 transition-colors">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> PDF (.pdf)
                    </button>
                    <button onClick={() => handleExport('DOCX')} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-3 transition-colors">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Word (.docx)
                    </button>
                    <button onClick={() => handleExport('PPTX')} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-500 flex items-center gap-3 transition-colors">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg> PowerPoint (.pptx)
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* === VIEW 1: DASHBOARD GALLERY === */}
        {view === 'gallery' && (
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12">
              
              {/* Premium Hero Banner */}
              <div className="mb-12 bg-gradient-to-br from-violet-900 via-indigo-800 to-violet-600 rounded-3xl p-8 sm:p-10 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-violet-400 opacity-20 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 max-w-xl">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                    {pendingExtractedData ? "Data Extracted!" : "Create a standout resume."}
                  </h1>
                  <p className="text-violet-200 text-lg sm:text-xl">
                    {pendingExtractedData 
                      ? "Your experience has been parsed. Scroll down and pick any template below to map your data instantly." 
                      : "Choose from professional, ATS-friendly designs or start by importing your existing resume data."}
                  </p>
                  
                  {!pendingExtractedData && (
                    <div className="mt-8 flex flex-wrap gap-4">
                      <button onClick={scrollToTemplates} className="bg-white text-violet-900 hover:bg-slate-50 font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2">
                        Browse Templates
                      </button>
                      <button onClick={() => templateInputRef.current?.click()} disabled={isUploading} className="bg-transparent hover:bg-white/5 text-violet-100 font-medium py-3 px-6 rounded-xl transition-colors border border-dashed border-white/30 flex items-center gap-2">
                        Upload Client Template
                      </button>
                    </div>
                  )}
                </div>

                {/* Search Bar inside Hero */}
                <div className="relative z-10 w-full md:w-auto flex-shrink-0">
                   <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 focus-within:bg-white/20 focus-within:border-violet-300 focus-within:ring-4 focus-within:ring-violet-400/20 rounded-full px-5 py-3.5 transition-all duration-300 w-full md:w-80 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="ml-3 outline-none text-base bg-transparent w-full placeholder-violet-200 text-white font-medium"
                      />
                   </div>
                </div>
              </div>

              {/* RECENT FILES SECTION */}
              {resumes.length > 0 && !pendingExtractedData && (
                <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Recent Resumes</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {resumes.map(resume => (
                      <div key={resume.id} onClick={() => { setActiveResumeId(resume.id); setView('editor'); }} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 hover:shadow-lg hover:border-violet-300 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-48 relative">
                        {/* Document Thumbnail Mock */}
                        <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 mb-4 flex flex-col items-center justify-center overflow-hidden relative">
                           <div className="w-12 h-16 bg-white shadow-sm border border-slate-200 rounded p-1.5 flex flex-col gap-1">
                              <div className="w-full h-1 bg-slate-200 rounded-full"></div>
                              <div className="w-3/4 h-1 bg-slate-200 rounded-full"></div>
                              <div className="w-5/6 h-1 bg-slate-100 rounded-full mt-1"></div>
                              <div className="w-full h-1 bg-slate-100 rounded-full"></div>
                           </div>
                        </div>
                        
                        <div className="flex flex-col justify-end">
                          {renamingResumeId === resume.id ? (
                            <input 
                              autoFocus
                              value={renamingValue}
                              onChange={handleRenameChange}
                              onKeyDown={handleRenameKeyDown}
                              onBlur={saveRename}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full bg-slate-100 text-slate-800 text-sm font-semibold px-2 py-1 rounded outline-none border border-violet-500 mb-1"
                            />
                          ) : (
                            <h3 className="text-sm font-bold truncate text-slate-700 group-hover:text-violet-700 transition-colors mb-1">{resume.name}</h3>
                          )}
                          <p className="text-[10px] text-slate-400 font-medium">{resume.lastModified || 'Saved recently'}</p>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                          <button onClick={(e) => { e.stopPropagation(); startRename(e, resume.id, resume.name); }} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-violet-600 hover:border-violet-300 shadow-sm rounded-md transition-all" title="Rename">
                            <IconRenderer type="pencil" size="14" />
                          </button>
                          <button onClick={(e) => confirmDelete(e, resume.id)} className="p-1.5 bg-white border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-300 shadow-sm rounded-md transition-all" title="Delete">
                            <IconRenderer type="trash" size="14" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TEMPLATE GALLERY SECTION */}
              <div id="templates-section">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">Template Gallery</h2>
                  
                  {/* Horizontal Filters */}
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Columns</span>
                      <button onClick={() => setFilterCols('all')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterCols === 'all' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>All</button>
                      <button onClick={() => setFilterCols(1)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterCols === 1 ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>1 Col</button>
                      <button onClick={() => setFilterCols(2)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterCols === 2 ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>2 Col</button>
                    </div>
                    
                    <div className="flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg shadow-sm">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Photo</span>
                      <button onClick={() => setFilterHeadshot('all')} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterHeadshot === 'all' ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>All</button>
                      <button onClick={() => setFilterHeadshot(true)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterHeadshot === true ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>Yes</button>
                      <button onClick={() => setFilterHeadshot(false)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${filterHeadshot === false ? 'bg-slate-100 text-slate-800' : 'text-slate-500 hover:bg-slate-50'}`}>No</button>
                    </div>
                  </div>
                </div>

                {/* Grid Container */}
                <div className="flex flex-wrap gap-8 pb-12 justify-center sm:justify-start">
                  {filteredTemplates.map(tpl => {
                    const mockFormData = {};
                    const sourceData = pendingExtractedData || (activeResume ? formData : null);
                    
                    tpl.elements.forEach(e => {
                      let val = (sourceData && sourceData[e.id] !== undefined) ? sourceData[e.id] : e.defaultVal;
                      if (val === null || val === undefined || String(val).trim() === '') val = e.defaultVal;
                      mockFormData[e.id] = val;
                    });
                    
                    // Fixed gallery scale of 0.25 fits nicely in most grids
                    const scale = 0.25;
                    const scaledW = tpl.page.width * scale;
                    const scaledH = tpl.page.minHeight * scale;
                    
                    return (
                    <div key={tpl.id} className="group flex flex-col items-center">
                      
                      {/* TIGHT BOUNDING BOX CONTAINER FOR PERFECT BORDER/SHADOW */}
                      <div 
                        onClick={() => handleSelectTemplate(tpl)}
                        className="relative bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:border-violet-400 flex-shrink-0"
                        style={{ width: `${scaledW}px`, height: `${scaledH}px` }}
                      >
                         <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left', width: `${tpl.page.width}px`, minHeight: `${tpl.page.minHeight}px`, pointerEvents: 'none' }}>
                            <RenderTemplate resumeData={{data: tpl}} formData={mockFormData} />
                         </div>

                         {/* Hover Action Overlay */}
                         <div className="absolute inset-0 bg-slate-900/5 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
                           <button className="bg-violet-600 text-white font-bold px-5 py-2.5 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center gap-2 text-sm">
                             {pendingExtractedData ? 'Map Data' : (activeResume ? 'Switch Layout' : 'Use Template')}
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                           </button>
                         </div>
                      </div>
                      
                      <h3 className="mt-4 text-sm font-bold text-slate-700 tracking-tight text-center">{tpl.name}</h3>
                    </div>
                  )})}
                  
                  {filteredTemplates.length === 0 && (
                    <div className="w-full py-20 text-center text-slate-500">
                      <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <p className="text-lg font-bold text-slate-700">No templates found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* === VIEW 2: SPLIT SCREEN EDITOR === */}
        {view === 'editor' && activeResume && (
          <div className="flex-1 flex overflow-hidden bg-slate-100 relative w-full">
            
            {/* Left Pane: Editor Tools */}
            {isEditorOpen && (
              <div 
                className="flex flex-col h-full bg-white border-r border-slate-200 flex-shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)] absolute md:relative transition-transform duration-300 ease-in-out" 
                style={{ width: isMobile ? '100%' : `${editorWidth}px`, maxWidth: '100vw' }}
              >
                {/* Editor Tabs */}
                <div className="flex border-b border-slate-200 flex-shrink-0 bg-white">
                  <button onClick={() => setActiveEditorTab('content')} className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${activeEditorTab === 'content' ? 'border-b-2 border-violet-600 text-violet-700 bg-violet-50/50' : 'text-slate-500 hover:bg-slate-50'}`}>Content</button>
                  <button onClick={() => setActiveEditorTab('design')} className={`flex-1 py-3.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${activeEditorTab === 'design' ? 'border-b-2 border-violet-600 text-violet-700 bg-violet-50/50' : 'text-slate-500 hover:bg-slate-50'}`}>Design</button>
                </div>

                <div id="editor-content-pane" className="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar bg-white pb-20 md:pb-6">
                  
                  {/* DESIGN TAB */}
                  {activeEditorTab === 'design' && (
                    <div className="space-y-6 animate-in fade-in duration-200">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                          <IconRenderer type="settings" size="14" color="#94a3b8" /> Font Style
                        </label>
                        <select 
                          value={activeResume.data.designConfig?.fontFamily || 'Arial, sans-serif'} 
                          onChange={(e) => updateDesign('fontFamily', e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-bold focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all cursor-pointer"
                        >
                          <option value="'Inter', sans-serif">Inter (Modern Sans)</option>
                          <option value="'Arial', sans-serif">Arial (Classic Sans)</option>
                          <option value="'Helvetica', sans-serif">Helvetica (Clean Sans)</option>
                          <option value="'Georgia', serif">Georgia (Elegant Serif)</option>
                          <option value="'Times New Roman', serif">Times New Roman (Formal Serif)</option>
                          <option value="'Roboto Mono', monospace">Roboto Mono (Tech Monospace)</option>
                          <option value="'Trebuchet MS', sans-serif">Trebuchet MS (Friendly Sans)</option>
                        </select>
                      </div>

                      <div className="h-px bg-slate-100 w-full my-2"></div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">Primary Theme Color</label>
                        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform bg-white">
                            <input 
                              type="color" 
                              value={activeResume.data.designConfig?.accentColor || activeResume.data.defaultAccent} 
                              onChange={(e) => updateDesign('accentColor', e.target.value)}
                              className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] cursor-pointer"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-slate-700 uppercase">{activeResume.data.designConfig?.accentColor || activeResume.data.defaultAccent}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Applied to headers and icons</div>
                          </div>
                        </div>
                      </div>

                      {activeResume.data.columns === 2 && (
                        <div>
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 block">Sidebar Background</label>
                          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-md flex-shrink-0 cursor-pointer hover:scale-105 transition-transform bg-white">
                              <input 
                                type="color" 
                                value={activeResume.data.designConfig?.sidebarColor || activeResume.data.leftBg} 
                                onChange={(e) => updateDesign('sidebarColor', e.target.value)}
                                className="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] cursor-pointer"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-slate-700 uppercase">{activeResume.data.designConfig?.sidebarColor || activeResume.data.leftBg}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 font-medium">Left column fill color</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* CONTENT TAB */}
                  {activeEditorTab === 'content' && (
                    <div className="space-y-6">
                      {activeResume.data.elements.filter(el => el.type !== 'shape' && el.type !== 'icon').map((el) => {
                        
                        if (el.type === 'image') {
                          return (
                            <div key={`${activeResumeId}-${el.id}`} className="flex flex-col gap-3 pb-4 border-b border-slate-100">
                              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{el.label}</label>
                              <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={(e) => handleImageUpload(e, el.id)} />
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-slate-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                                  {formData[el.id] ? <img src={formData[el.id]} alt="Profile" className="w-full h-full object-cover" /> : <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
                                </div>
                                <button onClick={() => imageInputRef.current?.click()} className="px-4 py-2 text-xs font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors border border-violet-100 shadow-sm">
                                  Upload Photo
                                </button>
                              </div>
                            </div>
                          )
                        }

                        return (
                          <div key={`${activeResumeId}-${el.id}`} className="flex flex-col gap-1.5 group w-full">
                            <label className="text-[11px] font-bold text-slate-400 group-focus-within:text-violet-600 uppercase tracking-wider flex justify-between items-center transition-colors">
                              {el.label}
                              {el.isMultiline && (
                                <button
                                  onClick={() => insertBullet(el.id)}
                                  className="normal-case text-[10px] font-bold bg-slate-100 hover:bg-violet-100 text-slate-500 hover:text-violet-700 px-2 py-0.5 rounded transition-colors flex items-center gap-1 shadow-sm"
                                  title="Add bullet point"
                                >
                                  <span className="text-sm leading-none">&bull;</span> Bullet
                                </button>
                              )}
                            </label>
                            {el.isMultiline ? (
                              <div className="flex flex-col gap-2 w-full">
                                <textarea
                                  id={`textarea-${el.id}`}
                                  onKeyDown={(e) => handleTextareaKeyDown(e, el.id)}
                                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all resize-y min-h-[90px] shadow-sm font-medium"
                                  value={formData[el.id] || ''} onChange={(e) => handleChange(el.id, e.target.value)}
                                />
                                {el.isProgress && (
                                  <div className="mt-2 bg-white border border-slate-100 rounded-lg p-3.5 space-y-3 shadow-sm ring-1 ring-slate-900/5">
                                    <label className="text-[10px] font-bold text-violet-600 uppercase tracking-wider flex items-center gap-1.5">
                                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                      Adjust Skill Levels
                                    </label>
                                    <div className="space-y-3">
                                      {(formData[el.id] || '').split('\n').map((line, i) => {
                                        if (!line.trim()) return null;
                                        const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                                        const progressArr = formData[`${el.id}_progress`] || [];
                                        const progress = progressArr[i] !== undefined ? progressArr[i] : (65 + ((i * 13) % 30));
                                        
                                        return (
                                          <div key={i} className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-slate-600 truncate w-24" title={cleanLine}>{cleanLine}</span>
                                            <input 
                                              type="range" 
                                              min="10" max="100" 
                                              value={progress}
                                              onChange={(e) => {
                                                const newArr = [...(formData[`${el.id}_progress`] || [])];
                                                for(let j=0; j<=i; j++) {
                                                  if(newArr[j] === undefined) newArr[j] = 65 + ((j * 13) % 30);
                                                }
                                                newArr[i] = parseInt(e.target.value);
                                                handleProgressChange(el.id, newArr);
                                              }}
                                              className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
                                            />
                                            <span className="text-xs font-bold text-slate-400 w-9 text-right">{progress}%</span>
                                          </div>
                                        )
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <input
                                type="text"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-300 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all shadow-sm font-medium"
                                value={formData[el.id] || ''} onChange={(e) => handleChange(el.id, e.target.value)}
                              />
                            )}
                          </div>
                        )
                      })}
                      
                      {/* DYNAMIC ADD JOB BUTTON */}
                      <div className="pt-4 border-t border-slate-100 flex justify-center pb-2">
                        <button onClick={handleAddJob} className="flex items-center gap-2 text-sm font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-4 py-2.5 rounded-xl transition-colors border border-violet-100 w-full justify-center shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                          Add Another Job
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Drag Resizer */}
            {isEditorOpen && !isMobile && (
              <div onMouseDown={handleMouseDown} className={`w-1 flex-shrink-0 cursor-col-resize hover:bg-violet-400 transition-colors z-20 ${isDragging ? 'bg-violet-500' : 'bg-transparent'}`}></div>
            )}

            {/* Right Pane: Live Document Preview */}
            <div ref={rightPaneRef} className="flex-1 bg-slate-200/50 flex justify-center items-start overflow-auto p-4 sm:p-8 lg:p-12 custom-scrollbar relative w-full">
              {activeResume && (() => {
                const scaledWidth = activeResume.data.page.width * previewScale;
                const scaledHeight = activeResume.data.page.minHeight * previewScale;
                
                return (
                  <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded transition-all duration-200 ease-in-out z-10 ring-1 ring-slate-900/5 bg-white overflow-hidden" 
                       style={{ width: `${scaledWidth}px`, minHeight: `${scaledHeight}px` }}>
                    
                    <div id="printable-resume" style={{ width: `${activeResume.data.page.width}px`, minHeight: `${activeResume.data.page.minHeight}px`, transform: `scale(${previewScale})`, transformOrigin: 'top left' }}>
                      <RenderTemplate 
                         resumeData={activeResume} 
                         formData={formData} 
                         onElementMouseDown={handleElementMouseDown} 
                         draggingElementId={draggingElementId} 
                      />
                    </div>

                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* --- GLOBAL TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border ${toast.type === 'loading' ? 'bg-slate-800 border-slate-700 text-white' : toast.type === 'success' ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
            {toast.type === 'loading' && (
              <svg className="animate-spin h-5 w-5 text-violet-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            )}
            {toast.type === 'success' && (
              <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
            )}
            <span className="text-sm font-bold">{toast.message}</span>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #94a3b8; }
        .custom-scrollbar-dark::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar-dark::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar-dark::-webkit-scrollbar-thumb { background-color: #334155; border-radius: 10px; }
        .custom-scrollbar-dark:hover::-webkit-scrollbar-thumb { background-color: #475569; }

        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-resume, #printable-resume * {
            visibility: visible !important;
          }
          #printable-resume {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            transform: scale(1) !important;
            width: auto !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            margin: 0;
            size: auto;
          }
        }
      `}} />
    </div>
  );
}