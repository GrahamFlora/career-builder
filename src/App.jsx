<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SLH Profiler</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    
    <!-- Added Native File Export Engines -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/gitbrent/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"></script>

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        accenture: {
                            purple: '#a100ff', 
                            dark: '#000000',
                            gray: '#464646',
                            light: '#f4f4f4',
                            border: '#e5e5e5'
                        }
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        serif: ['Georgia', 'serif'],
                        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    
    <style>
        :root {
            --theme-color: #a100ff;
        }

        /* Dynamic Theme Overrides for Tweaking */
        .text-accenture-purple { color: var(--theme-color) !important; }
        .bg-accenture-purple { background-color: var(--theme-color) !important; }
        .border-accenture-purple { border-color: var(--theme-color) !important; }
        .hover\:bg-accenture-purple:hover { background-color: var(--theme-color) !important; }
        .hover\:text-accenture-purple:hover { color: var(--theme-color) !important; }
        .hover\:border-accenture-purple:hover { border-color: var(--theme-color) !important; }

        body { background-color: #f4f4f4; color: #000000; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        /* Modern Navbar Links */
        .nav-link {
            padding: 1.2rem 1rem;
            font-weight: 600;
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.2s;
            color: #888;
            border-bottom: 3px solid transparent;
            cursor: pointer;
            position: relative;
            z-index: 50;
            outline: none;
            background: transparent;
            border: none;
        }
        .nav-link:hover { color: #fff; }
        .nav-link.active { color: #fff; border-bottom: 3px solid var(--theme-color); }
        
        .page-view { display: none; animation: fadeIn 0.4s ease-out; }
        .page-view.active { display: block; }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Tooltips */
        .custom-tooltip-container { position: relative; display: inline-flex; }
        .custom-tooltip {
            visibility: hidden;
            width: 260px;
            background-color: #000;
            color: #fff;
            text-align: left;
            border-radius: 4px;
            padding: 10px 14px;
            position: absolute;
            z-index: 100;
            top: 120%; 
            left: 50%;
            transform: translateX(-50%);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 0.75rem;
            font-weight: 400;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
            border: 1px solid #333;
            pointer-events: none;
        }
        .custom-tooltip::after {
            content: "";
            position: absolute;
            bottom: 100%; 
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #000 transparent;
        }
        
        /* Tooltip positioning variants */
        .custom-tooltip.tooltip-right-align {
            left: auto;
            right: 0;
            transform: translateX(0);
        }
        .custom-tooltip.tooltip-right-align::after {
            left: auto;
            right: 15px;
            transform: translateX(0);
        }
        .custom-tooltip.tooltip-left-align {
            left: 0;
            transform: translateX(0);
        }
        .custom-tooltip.tooltip-left-align::after {
            left: 15px;
            transform: translateX(0);
        }
        
        .custom-tooltip-container:hover .custom-tooltip { visibility: visible; opacity: 1; top: 110%; }

        /* Corporate Document Inputs */
        .doc-input {
            width: 100%; border: 1px solid transparent; padding: 0.5rem 0.75rem; 
            transition: all 0.2s; background: transparent; border-radius: 4px;
        }
        .doc-input:hover { background: #f9fafb; border-color: #e5e5e5; }
        .doc-input:focus {
            background: #fff; outline: none; border-color: var(--theme-color);
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
        }
        .doc-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        
        /* Template Grid Items */
        .template-card { border: 2px solid #e5e5e5; transition: all 0.3s; cursor: pointer; border-radius: 6px; background: #fff; flex-shrink: 0; width: 140px;}
        .template-card:hover { border-color: #d896ff; transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05); }
        .template-card.selected { border-color: var(--theme-color); background-color: #faf5ff; box-shadow: 0 0 0 2px rgba(161, 0, 255, 0.2); }
        
        /* Custom Scrollbar */
        .h-scroll::-webkit-scrollbar { height: 6px; }
        .h-scroll::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .h-scroll::-webkit-scrollbar-thumb { background: #ccc; border-radius: 4px; }
        .h-scroll::-webkit-scrollbar-thumb:hover { background: var(--theme-color); }

        /* Inline Editor Highlight */
        .edit-el {
            position: relative;
            cursor: pointer;
            transition: outline 0.1s ease-in-out, background-color 0.1s ease-in-out;
            page-break-inside: avoid;
        }
        .edit-el:hover {
            outline: 2px dashed rgba(0, 0, 0, 0.2);
            outline-offset: 4px;
            border-radius: 2px;
            background-color: rgba(0, 0, 0, 0.02);
        }

        /* Visual Pagination Guide */
        .page-container {
            min-height: 1056px;
        }

        @media print {
            body { background: white; }
            .page-container { background-image: none !important; min-height: auto; padding: 0 !important; }
            nav, .horizontal-control-deck, .floating-actions, #pagination-controls, #inline-editor { display: none !important; }
            #resume-window { height: auto !important; overflow: visible !important; box-shadow: none !important; max-width: none !important; width: 100% !important; }
            #resume-preview { position: relative !important; transform: none !important; border: none !important; box-shadow: none !important; padding: 0 !important; margin: 0 !important; }
            .edit-el { margin-top: var(--orig-mt, 0) !important; }
            @page { margin: 1in; size: letter portrait; }
        }
    </style>
</head>
<body class="pt-24 pb-12">

    <!-- NAVIGATION BAR -->
    <nav class="bg-black shadow-lg fixed w-full top-0 z-[100] border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-[101]">
            <div class="flex justify-between items-center h-[72px]">
                <div class="flex-shrink-0 flex items-center gap-2 pointer-events-auto">
                    <!-- Hamburger Icon moved to the far left -->
                    <button onclick="toggleLeftMenu()" class="text-gray-300 hover:text-white transition-colors p-2 text-xl flex items-center mr-1" title="Open Menu">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <span class="text-accenture-purple font-black text-3xl leading-none">></span>
                    <span class="font-black text-xl tracking-widest text-white uppercase mt-1">SLH TalentConnect</span>
                </div>
                
                <!-- Main Nav -->
                <div class="flex space-x-1 sm:space-x-2 pointer-events-auto items-center">
                    <button type="button" id="btn-nav-profile" class="nav-link active flex items-center gap-2" onclick="switchTab('profile')">
                        <i class="fa-regular fa-user"></i> <span class="hidden sm:inline">Profile</span>
                    </button>
                    <button type="button" id="btn-nav-create" class="nav-link flex items-center gap-2" onclick="switchTab('create')">
                        <i class="fa-solid fa-wand-magic-sparkles"></i> <span class="hidden sm:inline">Create Resume</span>
                    </button>
                    <button type="button" id="btn-nav-history" class="nav-link flex items-center gap-2" onclick="switchTab('history')">
                        <i class="fa-solid fa-clock-rotate-left"></i> <span class="hidden sm:inline">History</span>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- LEFT MENU DRAWER -->
    <div id="left-menu-overlay" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] hidden opacity-0 transition-opacity duration-300" onclick="toggleLeftMenu()"></div>
    <div id="left-menu" class="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-[210] transform -translate-x-full transition-transform duration-300 flex flex-col pointer-events-auto border-r border-gray-200">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center bg-black">
            <span class="font-black text-lg tracking-widest text-white uppercase">App Menu</span>
            <button onclick="toggleLeftMenu()" class="text-gray-400 hover:text-white transition-colors"><i class="fa-solid fa-xmark text-xl"></i></button>
        </div>
        <div class="p-4 flex flex-col gap-2">
            <button onclick="switchTab('sme'); toggleLeftMenu();" class="flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 text-black font-bold transition-all shadow-sm">
                <i class="fa-solid fa-users text-accenture-purple text-xl w-6"></i> 
                <span class="uppercase tracking-widest text-sm">SME Finder</span>
            </button>
            <button onclick="switchTab('settings'); toggleLeftMenu();" class="flex items-center gap-4 p-4 text-left hover:bg-gray-50 rounded border border-transparent hover:border-gray-200 text-black font-bold transition-all shadow-sm">
                <i class="fa-solid fa-gear text-accenture-purple text-xl w-6"></i> 
                <span class="uppercase tracking-widest text-sm">Settings</span>
            </button>
        </div>
    </div>

    <!-- MAIN APP CONTENT -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 relative z-10 pointer-events-auto">

        <!-- ============================================== -->
        <!-- PROFILE PAGE (Active by default)               -->
        <!-- ============================================== -->
        <section id="view-profile" class="page-view active">
            <div class="flex justify-between items-center mb-8">
                <div>
                    <h2 class="text-3xl font-black text-accenture-dark uppercase tracking-tight">Master Profile Data</h2>
                    <p class="text-sm text-accenture-gray mt-1 font-medium">Edit your core baseline information below.</p>
                </div>
                
                <div>
                    <input type="file" id="profile-upload" class="hidden" accept=".docx,.pdf,.ppt,.pptx" onchange="handleProfileUpload(this)">
                    <div class="custom-tooltip-container">
                        <button type="button" onclick="document.getElementById('profile-upload').click()" class="bg-black text-white px-5 py-2.5 rounded hover:bg-gray-800 flex items-center gap-2 shadow-md transition font-semibold text-sm">
                            <i class="fa-solid fa-cloud-arrow-up text-accenture-purple"></i> Upload Source Data
                        </button>
                        <div class="custom-tooltip tooltip-right-align">Upload an existing resume (DOCX, PPTX) to dynamically auto-fill your master profile.</div>
                    </div>
                </div>
            </div>

            <div class="bg-white shadow-xl rounded p-8 sm:p-12 max-w-4xl mx-auto min-h-[800px] border border-accenture-border">
                <div class="space-y-8">
                    
                    <!-- Header Info with Profile Picture -->
                    <div class="text-center border-b border-gray-200 pb-8 relative">
                        <div class="relative w-28 h-28 mx-auto mb-5 group">
                            <img id="prof-pic-preview" src="https://placehold.co/128x128/f4f4f4/a100ff?text=PHOTO" alt="Profile" class="w-full h-full rounded-full object-cover border-4 border-white shadow-lg">
                            <div class="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onclick="document.getElementById('pic-upload').click()">
                                <i class="fa-solid fa-camera text-white text-xl"></i>
                            </div>
                            <input type="file" id="pic-upload" class="hidden" accept="image/*" onchange="handlePicUpload(this)">
                        </div>

                        <input type="text" id="prof-name" class="doc-input text-4xl font-black text-center text-black tracking-tight" placeholder="FULL NAME" value="">
                        <input type="text" id="prof-title" class="doc-input text-xl font-bold text-center text-accenture-purple tracking-tight mt-2" placeholder="PROFESSIONAL TITLE" value="">
                        
                        <div class="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mt-4">
                            <div class="flex items-center text-accenture-gray group">
                                <i class="fa-solid fa-envelope text-accenture-purple mr-2 group-hover:scale-110 transition-transform"></i>
                                <input type="text" id="prof-email" class="doc-input text-sm w-56 font-medium" placeholder="Email Address" value="">
                            </div>
                            <span class="text-gray-300 hidden sm:inline">|</span>
                            <div class="flex items-center text-accenture-gray group">
                                <i class="fa-solid fa-phone text-accenture-purple mr-2 group-hover:scale-110 transition-transform"></i>
                                <input type="text" id="prof-phone" class="doc-input text-sm w-36 font-medium" placeholder="Phone Number" value="">
                            </div>
                            <span class="text-gray-300 hidden sm:inline">|</span>
                            <div class="flex items-center text-accenture-gray group">
                                <i class="fa-brands fa-linkedin text-accenture-purple mr-2 group-hover:scale-110 transition-transform"></i>
                                <input type="text" id="prof-location" class="doc-input text-sm w-48 font-medium" placeholder="LinkedIn URL" value="">
                            </div>
                        </div>
                    </div>

                    <!-- Professional Summary -->
                    <div class="group">
                        <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                            <i class="fa-solid fa-user-tie text-accenture-purple"></i> Professional Summary
                        </h3>
                        <textarea id="prof-summary" class="doc-input doc-textarea text-accenture-gray mt-1 text-sm font-medium" placeholder="Write a brief professional summary..."></textarea>
                    </div>

                    <!-- Work Experience -->
                    <div class="group">
                        <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                            <i class="fa-solid fa-briefcase text-accenture-purple"></i> Work Experience
                        </h3>
                        <div class="mt-1 relative">
                            <textarea id="prof-exp" class="doc-input doc-textarea text-accenture-gray min-h-[400px] text-sm font-medium" placeholder="Job Title - Company - Dates&#10;- Achievement 1&#10;- Achievement 2"></textarea>
                        </div>
                    </div>

                    <!-- Education / Certs -->
                    <div class="group">
                        <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                            <i class="fa-solid fa-certificate text-accenture-purple"></i> Certifications & Education
                        </h3>
                        <textarea id="prof-edu" class="doc-input doc-textarea text-accenture-gray text-sm font-medium min-h-[140px]" placeholder="Degree/Cert - Institution - Year"></textarea>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="group">
                            <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                                <i class="fa-solid fa-laptop-code text-accenture-purple"></i> Technical Skills
                            </h3>
                            <textarea id="prof-tech-skills" class="doc-input doc-textarea text-accenture-gray text-sm font-medium" placeholder="List your skills..."></textarea>
                        </div>

                        <div class="group">
                            <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                                <i class="fa-solid fa-gears text-accenture-purple"></i> Functional Skills
                            </h3>
                            <textarea id="prof-func-skills" class="doc-input doc-textarea text-accenture-gray text-sm font-medium" placeholder="List your skills..."></textarea>
                        </div>

                        <div class="group md:col-span-2">
                            <h3 class="text-lg font-black uppercase text-black mb-3 border-b-2 border-accenture-purple inline-flex items-center gap-2 pb-1">
                                <i class="fa-solid fa-building text-accenture-purple"></i> Industry Background
                            </h3>
                            <textarea id="prof-industry" class="doc-input doc-textarea text-accenture-gray text-sm font-medium min-h-[60px]" placeholder="List your industries..."></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================================== -->
        <!-- CREATE RESUME PAGE                             -->
        <!-- ============================================== -->
        <section id="view-create" class="page-view">
            
            <!-- THE HORIZONTAL CONTROL DECK -->
            <div class="horizontal-control-deck bg-white rounded-t-xl shadow-md border border-accenture-border mb-0 relative z-20 overflow-hidden">
                <!-- Row 1: Action Bar -->
                <div class="p-4 flex flex-wrap gap-4 items-center justify-between border-b border-gray-100 bg-gray-50/50">
                    <div class="flex flex-wrap gap-2 items-center">
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="populateFromProfile()" class="bg-black text-white border border-black hover:bg-accenture-purple hover:border-accenture-purple px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                                <i class="fa-solid fa-address-card"></i> Populate using current profile data
                            </button>
                            <div class="custom-tooltip">Data from "profile page" will be used to populate your resume.</div>
                        </div>

                        <div class="custom-tooltip-container">
                            <input type="file" id="source-upload" class="hidden" accept=".docx,.ppt,.pdf,.pptx" onchange="handleFileUpload(this, 'source')">
                            <button type="button" onclick="document.getElementById('source-upload').click()" class="bg-white text-black border border-gray-300 hover:border-black px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                                <i class="fa-solid fa-file-import text-accenture-purple"></i> Upload data source resume
                            </button>
                            <div class="custom-tooltip">Upload a file (resume in .docx, ppt, pdf format) containing your information to initially populate the fields of the new resume you are creating.</div>
                        </div>

                        <div class="custom-tooltip-container">
                            <input type="file" id="target-upload" class="hidden" accept=".docx,.ppt,.pdf,.pptx" onchange="handleFileUpload(this, 'target')">
                            <button type="button" onclick="document.getElementById('target-upload').click()" class="bg-white text-black border border-gray-300 hover:border-black px-4 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                                <i class="fa-solid fa-file-code text-accenture-purple"></i> Upload target resume format
                            </button>
                            <div class="custom-tooltip">Upload a file sample (in .docx .ppt, pdf format) of your desired resume output. Target format might contain more fields than what is available in your current profile.</div>
                        </div>
                    </div>

                    <!-- Right Side: Start Fresh -->
                    <div class="flex items-center gap-2">
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="clearResumeCanvas()" class="bg-white text-gray-600 border border-gray-300 hover:border-red-600 hover:text-red-600 px-3 py-2 rounded text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
                                <i class="fa-solid fa-rotate-left"></i> Start Fresh
                            </button>
                            <div class="custom-tooltip tooltip-right-align">Reset the canvas and clear all generated content.</div>
                        </div>
                    </div>
                </div>

                <!-- Row 2: Template Library (Horizontal Scroll) -->
                <div class="p-5 bg-white">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-sm font-black text-black uppercase tracking-tight flex items-center gap-2">
                            <i class="fa-solid fa-layer-group text-accenture-purple"></i> Template Library
                        </h3>
                        <span class="text-xs text-gray-400 font-medium">Scroll to see more <i class="fa-solid fa-arrow-right ml-1"></i></span>
                    </div>
                    <div class="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 h-scroll" id="template-grid">
                        <!-- Automatically generated via JS -->
                    </div>
                </div>
            </div>

            <!-- Preview Canvas & Actions -->
            <div class="bg-gray-100 shadow-xl rounded-b-xl p-8 mx-auto border border-t-0 border-accenture-border relative z-10 flex flex-col items-center min-h-[900px]">
                
                <!-- Floating Export Actions Above Document -->
                <div class="floating-actions w-full max-w-[816px] flex justify-between gap-2 mb-4 items-center">
                    
                    <div class="flex items-center gap-2">
                        <!-- Auto-Save Indicator -->
                        <div class="custom-tooltip-container">
                            <div class="bg-white text-gray-500 px-3 py-2 rounded shadow-sm text-xs font-bold flex items-center gap-2 border border-gray-200">
                                <i id="save-indicator-icon" class="fa-solid fa-check text-emerald-500"></i> <span id="save-indicator-text">Saved</span>
                            </div>
                            <div class="custom-tooltip tooltip-left-align">Artifact is automatically saved to history on edit.</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2">
                        <!-- Revert -->
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="revertDocument()" class="bg-white text-gray-600 border border-gray-300 hover:border-orange-500 hover:text-orange-500 px-3 py-2 rounded text-xs font-bold flex items-center gap-2 transition-colors shadow-sm">
                                <i class="fa-solid fa-clock-rotate-left"></i> Revert
                            </button>
                            <div class="custom-tooltip tooltip-right-align">Revert to the initially generated layout before edits.</div>
                        </div>
                        <!-- PDF -->
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="exportResume('pdf')" class="bg-black hover:bg-accenture-purple text-white px-3 py-2.5 rounded shadow transition text-xs font-bold flex items-center gap-1">
                                <i class="fa-solid fa-file-pdf"></i> PDF
                            </button>
                            <div class="custom-tooltip tooltip-right-align w-auto whitespace-nowrap">Export as PDF</div>
                        </div>
                        <!-- DOCX -->
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="exportResume('docx')" class="bg-black hover:bg-accenture-purple text-white px-3 py-2.5 rounded shadow transition text-xs font-bold flex items-center gap-1">
                                <i class="fa-solid fa-file-word"></i> DOCX
                            </button>
                            <div class="custom-tooltip tooltip-right-align w-auto whitespace-nowrap">Export as Word (.docx)</div>
                        </div>
                        <!-- PPTX -->
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="exportResume('pptx')" class="bg-black hover:bg-accenture-purple text-white px-3 py-2.5 rounded shadow transition text-xs font-bold flex items-center gap-1">
                                <i class="fa-solid fa-file-powerpoint"></i> PPT
                            </button>
                            <div class="custom-tooltip tooltip-right-align w-auto whitespace-nowrap">Export as PowerPoint (.pptx)</div>
                        </div>
                    </div>
                </div>

                <!-- Window for US Letter Pagination -->
                <div id="resume-window" class="relative bg-white shadow-2xl overflow-hidden w-full max-w-[816px]" style="height: 1056px;">
                    <div id="resume-preview" class="w-full absolute top-0 left-0 transition-transform duration-300 origin-top flex flex-col min-h-full">
                        <div class="flex-1 flex flex-col h-full">
                            <div class="text-center text-gray-400 border-2 border-dashed border-gray-200 rounded bg-gray-50 flex flex-col items-center justify-center m-10 flex-1">
                                <i class="fa-solid fa-layer-group text-5xl mb-4 text-gray-300"></i>
                                <p class="font-medium text-gray-500 text-lg">Output rendering engine ready.</p>
                                <p class="text-sm mt-2">Select a template or upload target format to generate preview.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination Controls -->
                <div id="pagination-controls" class="mt-8 hidden items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-200">
                    <button type="button" onclick="prevPage()" class="text-accenture-gray hover:text-accenture-purple transition-colors p-1"><i class="fa-solid fa-chevron-left text-lg"></i></button>
                    <span id="page-indicator" class="text-sm font-black text-black uppercase tracking-widest min-w-[100px] text-center">Page 1 of 1</span>
                    <button type="button" onclick="nextPage()" class="text-accenture-gray hover:text-accenture-purple transition-colors p-1"><i class="fa-solid fa-chevron-right text-lg"></i></button>
                </div>
            </div>
        </section>

        <!-- ============================================== -->
        <!-- HISTORY PAGE                                   -->
        <!-- ============================================== -->
        <section id="view-history" class="page-view">
            <h2 class="text-3xl font-black text-accenture-dark uppercase tracking-tight mb-6 border-l-4 border-accenture-purple pl-3">Artifact Repository</h2>
            
            <div class="bg-white rounded shadow-md overflow-hidden border border-accenture-border">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-black">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Document Name</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Template Used</th>
                            <th class="px-6 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">Last Sync Date</th>
                            <th class="px-6 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200" id="history-table-body">
                        <!-- Dynamic content via JS -->
                    </tbody>
                </table>
            </div>
        </section>

        <!-- ============================================== -->
        <!-- SME FINDER PAGE                                -->
        <!-- ============================================== -->
        <section id="view-sme" class="page-view">
            <h2 class="text-3xl font-black text-accenture-dark uppercase tracking-tight mb-2 border-l-4 border-accenture-purple pl-3">SME Finder</h2>
            <p class="text-sm text-accenture-gray font-medium mb-8 pl-4">Search experts by skill, name, or experience.</p>
            
            <div class="bg-white rounded shadow-md p-6 border border-accenture-border mb-8">
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i class="fa-solid fa-magnifying-glass text-gray-400"></i>
                    </div>
                    <input type="text" id="sme-search" placeholder="Search (e.g., Splunk, AWS)..." class="doc-input text-base pl-11 py-3 w-full bg-gray-50 border-gray-200 shadow-inner rounded" oninput="renderSMEGrid(this.value)">
                </div>
                
                <div class="flex flex-wrap items-center gap-2 mt-4">
                    <span class="text-[11px] text-gray-400 font-bold uppercase tracking-wider mr-2">Quick Filters:</span>
                    <button onclick="document.getElementById('sme-search').value='Splunk'; renderSMEGrid('Splunk')" class="bg-white border border-gray-200 hover:border-accenture-purple hover:text-accenture-purple text-accenture-gray px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm">Splunk</button>
                    <button onclick="document.getElementById('sme-search').value='AWS'; renderSMEGrid('AWS')" class="bg-white border border-gray-200 hover:border-accenture-purple hover:text-accenture-purple text-accenture-gray px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm">AWS</button>
                    <button onclick="document.getElementById('sme-search').value='Security'; renderSMEGrid('Security')" class="bg-white border border-gray-200 hover:border-accenture-purple hover:text-accenture-purple text-accenture-gray px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm">Security</button>
                    <button onclick="document.getElementById('sme-search').value='Data Analytics'; renderSMEGrid('Data Analytics')" class="bg-white border border-gray-200 hover:border-accenture-purple hover:text-accenture-purple text-accenture-gray px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm">Data</button>
                    <button onclick="document.getElementById('sme-search').value=''; renderSMEGrid('')" class="bg-gray-100 border border-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors shadow-sm ml-2">Clear</button>
                </div>
            </div>

            <div id="sme-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                <!-- Cards populated by JS -->
            </div>
        </section>

        <!-- ============================================== -->
        <!-- SETTINGS PAGE                                  -->
        <!-- ============================================== -->
        <section id="view-settings" class="page-view">
            <h2 class="text-3xl font-black text-accenture-dark uppercase tracking-tight mb-2 border-l-4 border-accenture-purple pl-3">Settings</h2>
            <p class="text-sm text-accenture-gray font-medium mb-8 pl-4">Configure your application preferences.</p>

            <div class="bg-white rounded shadow-md p-8 border border-accenture-border max-w-2xl">
                <h3 class="font-black text-black uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2">Appearance</h3>
                <div class="mb-8">
                    <p class="text-sm font-bold text-gray-700 mb-3">App Accent Theme Color</p>
                    <div class="flex gap-3">
                        <button onclick="setThemeColor('#a100ff')" class="w-10 h-10 rounded-full bg-[#a100ff] shadow border-2 border-white ring-2 ring-transparent hover:ring-[#a100ff] transition-all" title="Accenture Purple"></button>
                        <button onclick="setThemeColor('#0284c7')" class="w-10 h-10 rounded-full bg-[#0284c7] shadow border-2 border-white ring-2 ring-transparent hover:ring-[#0284c7] transition-all" title="Ocean Blue"></button>
                        <button onclick="setThemeColor('#059669')" class="w-10 h-10 rounded-full bg-[#059669] shadow border-2 border-white ring-2 ring-transparent hover:ring-[#059669] transition-all" title="Emerald Green"></button>
                        <button onclick="setThemeColor('#e11d48')" class="w-10 h-10 rounded-full bg-[#e11d48] shadow border-2 border-white ring-2 ring-transparent hover:ring-[#e11d48] transition-all" title="Rose Red"></button>
                    </div>
                    <p class="text-xs text-gray-500 mt-2">Instantly updates the visual style of the application.</p>
                </div>

                <h3 class="font-black text-black uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2 mt-8">Data Management</h3>
                <div class="mb-2">
                    <p class="text-sm font-bold text-gray-700 mb-3">Clear App Data</p>
                    <button onclick="clearHistoryData()" class="w-full sm:w-auto bg-white border border-red-500 text-red-500 hover:bg-red-50 font-bold py-2.5 px-6 rounded transition-colors text-sm shadow-sm flex items-center justify-center gap-2">
                        <i class="fa-solid fa-trash-can"></i> Clear History Repository
                    </button>
                    <p class="text-xs text-gray-500 mt-2">Removes all saved artifacts from the History tab.</p>
                </div>
            </div>
        </section>

    </main>

    <!-- Delete Confirmation Modal -->
    <div id="delete-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[2000] hidden items-center justify-center pointer-events-auto">
        <div id="delete-modal-content" class="bg-white rounded shadow-2xl w-full max-w-md mx-4 transform transition-all duration-200 scale-95 opacity-0 border border-accenture-border">
            <div class="p-6 sm:p-8">
                <div class="flex items-start gap-4 mb-6">
                    <div class="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                        <i class="fa-solid fa-triangle-exclamation text-red-600 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-black text-black uppercase tracking-tight">Confirm Deletion</h3>
                        <p class="text-sm text-accenture-gray font-medium mt-2 leading-relaxed">This action cannot be undone. Are you sure you want to permanently delete this artifact from the repository?</p>
                    </div>
                </div>
                <div class="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button type="button" onclick="cancelDelete()" class="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-black font-bold text-sm rounded transition-colors shadow-sm">
                        Cancel
                    </button>
                    <button type="button" onclick="confirmDelete()" class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded shadow-md transition-colors flex items-center gap-2">
                        <i class="fa-solid fa-trash-can"></i> Delete Artifact
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- UI Overlay for alerts -->
    <div id="toast" class="fixed bottom-6 right-6 bg-black text-white px-6 py-4 rounded shadow-2xl transform transition-all translate-y-24 opacity-0 z-[3000] flex items-center gap-3 border border-gray-800 font-medium text-sm pointer-events-none">
        <i class="fa-solid fa-circle-check text-accenture-purple text-lg"></i>
        <span id="toast-msg">System message initialized.</span>
    </div>

    <!-- Interactive Inline Editor Toolbar -->
    <div id="inline-editor" class="fixed hidden bg-black border border-gray-700 shadow-2xl rounded-md z-[2000] flex items-center gap-1.5 p-1.5 transform -translate-x-1/2 transition-opacity duration-200 opacity-0">
        <div class="cursor-move text-gray-400 hover:text-white px-2 py-1.5 rounded hover:bg-gray-800 transition-colors" title="Drag to move"><i class="fa-solid fa-arrows-up-down-left-right"></i></div>
        <div class="w-px h-5 bg-gray-700 mx-1"></div>
        <select id="edit-font" class="bg-gray-800 text-white text-xs border border-gray-600 rounded p-1 outline-none h-8 font-medium">
            <option value="inherit">Default</option>
            <option value="'Inter', sans-serif">Inter</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="ui-monospace, monospace">Monospace</option>
            <option value="Cambria, serif">Cambria</option>
        </select>
        <input type="number" id="edit-size" class="bg-gray-800 text-white text-xs border border-gray-600 rounded p-1 w-14 h-8 outline-none text-center" title="Font Size (px)">
        <div class="relative w-8 h-8 rounded border border-gray-600 overflow-hidden cursor-pointer">
            <input type="color" id="edit-color" class="absolute inset-0 w-[200%] h-[200%] top-[-50%] left-[-50%] cursor-pointer bg-transparent border-0 p-0" title="Text Color">
        </div>
        <button type="button" id="edit-bold" class="text-gray-400 hover:text-accenture-purple px-2.5 py-1.5 rounded hover:bg-gray-800 transition-colors" title="Bold"><i class="fa-solid fa-bold"></i></button>
        <button type="button" id="edit-italic" class="text-gray-400 hover:text-accenture-purple px-2.5 py-1.5 rounded hover:bg-gray-800 transition-colors" title="Italic"><i class="fa-solid fa-italic"></i></button>
        <div class="w-px h-5 bg-gray-700 mx-1"></div>
        <button type="button" id="edit-reset" class="text-gray-400 hover:text-orange-400 px-2.5 py-1.5 rounded hover:bg-gray-800 transition-colors" title="Reset Element"><i class="fa-solid fa-rotate-left"></i></button>
        <button type="button" onclick="closeInlineEditor()" class="text-gray-400 hover:text-red-500 px-2 py-1.5 rounded hover:bg-gray-800 transition-colors" title="Close Toolbar"><i class="fa-solid fa-xmark"></i></button>
    </div>

    <script>
        // --- Navigation & Core UI Logic ---
        function switchTab(tabId) {
            const links = document.querySelectorAll('.nav-link');
            links.forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(`btn-nav-${tabId}`);
            if(activeBtn) activeBtn.classList.add('active');
            
            const views = document.querySelectorAll('.page-view');
            views.forEach(view => { view.classList.remove('active'); });
            
            const activeView = document.getElementById(`view-${tabId}`);
            if(activeView) activeView.classList.add('active');
        }

        // --- Left Menu & Modal Logic ---
        function toggleLeftMenu() {
            const menu = document.getElementById('left-menu');
            const overlay = document.getElementById('left-menu-overlay');
            const isOpen = !menu.classList.contains('-translate-x-full');
            
            if (isOpen) {
                menu.classList.add('-translate-x-full');
                overlay.classList.remove('opacity-100');
                setTimeout(() => overlay.classList.add('hidden'), 300);
            } else {
                overlay.classList.remove('hidden');
                void overlay.offsetWidth;
                overlay.classList.add('opacity-100');
                menu.classList.remove('-translate-x-full');
            }
        }

        // Settings actions
        function setThemeColor(hex) {
            document.documentElement.style.setProperty('--theme-color', hex);
            showToast("Application Theme Color updated successfully.");
        }

        function clearHistoryData() {
            if(confirm("Are you sure you want to completely clear the artifact repository? This cannot be undone.")) {
                historyRepository = [];
                renderHistoryTable();
                showToast("All historical artifacts have been permanently deleted.");
            }
        }

        function showToast(message) {
            const toast = document.getElementById('toast');
            document.getElementById('toast-msg').innerText = message;
            toast.classList.remove('translate-y-24', 'opacity-0');
            setTimeout(() => {
                toast.classList.add('translate-y-24', 'opacity-0');
            }, 3500);
        }

        // --- Profile Picture Management ---
        let profilePicDataUrl = null;

        function handlePicUpload(input) {
            if(input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicDataUrl = e.target.result;
                    document.getElementById('prof-pic-preview').src = profilePicDataUrl;
                    showToast("Profile picture updated.");
                    if(currentResumeData) {
                        currentResumeData.profilePic = profilePicDataUrl;
                        updatePreview(); 
                    }
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

        // --- History / Repository Management & Auto-Save ---
        let historyRepository = [];
        let activeArtifactId = null;
        let originalPreviewHtml = ""; // State for Reverting
        let currentResumeData = null;
        
        let currentPage = 1;
        let totalPages = 1;
        const PAGE_HEIGHT = 1056;

        function renderHistoryTable() {
            const tbody = document.getElementById('history-table-body');
            if(historyRepository.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500 text-sm">No artifacts saved yet.</td></tr>`;
                return;
            }

            tbody.innerHTML = historyRepository.map(item => `
                <tr id="row-${item.id}" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-5 whitespace-nowrap text-sm font-bold text-black">
                        <i class="fa-solid fa-file-lines text-accenture-purple mr-2"></i> ${item.name}
                    </td>
                    <td class="px-6 py-5 whitespace-nowrap text-sm text-accenture-gray font-medium">${item.template}</td>
                    <td class="px-6 py-5 whitespace-nowrap text-sm text-accenture-gray">${item.date}</td>
                    <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="editHistoryItem('${item.id}')" class="text-gray-400 hover:text-blue-600 mr-4 transition-colors p-2">
                                <i class="fa-solid fa-pen-to-square text-lg"></i>
                            </button>
                            <div class="custom-tooltip tooltip-top tooltip-right-align w-auto whitespace-nowrap">Edit Artifact</div>
                        </div>
                        <div class="custom-tooltip-container">
                            <button type="button" onclick="deleteHistoryItem('${item.id}')" class="text-gray-400 hover:text-red-600 transition-colors p-2">
                                <i class="fa-solid fa-trash-can text-lg"></i>
                            </button>
                            <div class="custom-tooltip tooltip-top tooltip-right-align w-auto whitespace-nowrap">Delete Artifact</div>
                        </div>
                    </td>
                </tr>
            `).join('');
        }

        function triggerAutoSave() {
            if (!activeArtifactId || !currentResumeData) return;
            
            const previewHtml = document.getElementById('resume-preview').innerHTML;
            const tplObj = templatesData.find(t => t.id === selectedTemplateId);
            
            let templateName = 'Target Format';
            if (tplObj) {
                templateName = tplObj.name;
            } else if (selectedTemplateId === 'imported') {
                templateName = 'Imported Template';
            }
            
            // Professional Formatting: Name - Title
            let docName = currentResumeData.name || "Professional Resume";
            if (currentResumeData.title) docName += ` - ${currentResumeData.title}`;
            
            const dateStr = new Date().toLocaleString('en-US', { 
                month: 'short', day: 'numeric', year: 'numeric', 
                hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true 
            });

            const existingIndex = historyRepository.findIndex(i => i.id === activeArtifactId);
            
            if (existingIndex > -1) {
                historyRepository[existingIndex].date = dateStr;
                historyRepository[existingIndex].html = previewHtml;
                historyRepository[existingIndex].resumeData = JSON.parse(JSON.stringify(currentResumeData));
            } else {
                historyRepository.unshift({
                    id: activeArtifactId,
                    name: docName,
                    template: templateName,
                    date: dateStr,
                    html: previewHtml,
                    resumeData: JSON.parse(JSON.stringify(currentResumeData))
                });
            }
            
            const indicatorIcon = document.getElementById('save-indicator-icon');
            const indicatorText = document.getElementById('save-indicator-text');
            indicatorIcon.className = "fa-solid fa-arrows-rotate fa-spin text-accenture-purple";
            indicatorText.innerText = "Saving...";
            
            setTimeout(() => {
                indicatorIcon.className = "fa-solid fa-check text-emerald-500";
                indicatorText.innerText = "Saved";
                renderHistoryTable();
            }, 600);
        }

        let artifactToDelete = null;

        function deleteHistoryItem(id) {
            artifactToDelete = id;
            const modal = document.getElementById('delete-modal');
            const content = document.getElementById('delete-modal-content');
            modal.classList.remove('hidden'); modal.classList.add('flex');
            setTimeout(() => {
                content.classList.remove('scale-95', 'opacity-0'); content.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function cancelDelete() {
            const modal = document.getElementById('delete-modal');
            const content = document.getElementById('delete-modal-content');
            content.classList.remove('scale-100', 'opacity-100'); content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden'); modal.classList.remove('flex');
                artifactToDelete = null;
            }, 200); 
        }

        function confirmDelete() {
            if (!artifactToDelete) return;
            historyRepository = historyRepository.filter(item => item.id !== artifactToDelete);
            if (activeArtifactId === artifactToDelete) clearResumeCanvas();
            renderHistoryTable();
            cancelDelete();
            setTimeout(() => { showToast("Artifact deleted from repository."); }, 250); 
        }

        function editHistoryItem(id) {
            const item = historyRepository.find(i => i.id === id);
            if(item) {
                activeArtifactId = item.id;
                currentResumeData = item.resumeData;
                document.getElementById('resume-preview').innerHTML = item.html;
                originalPreviewHtml = item.html; 
                showToast("Artifact loaded into rendering engine.");
                
                setTimeout(() => {
                    applyPaginationGaps();
                }, 100);

                switchTab('create');
            }
        }

        function clearResumeCanvas() {
            currentResumeData = null;
            activeArtifactId = null;
            originalPreviewHtml = "";
            document.querySelectorAll('.template-card').forEach(el => el.classList.remove('selected'));
            selectedTemplateId = null;
            document.getElementById('resume-preview').innerHTML = `
                <div class="flex-1 flex flex-col h-full">
                    <div class="text-center text-gray-400 border-2 border-dashed border-gray-200 rounded bg-gray-50 flex flex-col items-center justify-center m-10 flex-1 h-full">
                        <i class="fa-solid fa-rotate-left text-5xl mb-4 text-gray-300"></i>
                        <p class="font-medium text-gray-500 text-lg">Canvas Cleared.</p>
                        <p class="text-sm mt-2">Start a new document by populating data.</p>
                    </div>
                </div>
            `;
            closeInlineEditor();
            currentPage = 1;
            totalPages = 1;
            applyPageTransform();
            updatePagination();
            showToast("Rendering engine reset for new artifact.");
        }

        function revertDocument() {
            if (originalPreviewHtml && activeArtifactId) {
                document.getElementById('resume-preview').innerHTML = originalPreviewHtml;
                applyPaginationGaps();
                triggerAutoSave();
                showToast("Document reverted to initial state.");
            } else {
                showToast("No initial state to revert to.");
            }
        }

        const templatesData = [
            { id: 1, name: 'ATS Professional', cols: 1, hasPic: false },
            { id: 2, name: 'Modern Minimalist', cols: 1, hasPic: true },
            { id: 3, name: 'Technical Focus', cols: 1, hasPic: false },
            { id: 4, name: 'Executive Classic', cols: 1, hasPic: false },
            { id: 5, name: 'Creative Portfolio', cols: 2, hasPic: true },
            { id: 6, name: 'Graduate Starter', cols: 1, hasPic: false },
            { id: 7, name: 'BPO Specialist', cols: 1, hasPic: false },
            { id: 8, name: 'Project Showcase', cols: 1, hasPic: false },
            { id: 9, name: 'Academic Research', cols: 1, hasPic: false },
            { id: 10, name: 'Global Remote', cols: 1, hasPic: true }
        ];

        let selectedTemplateId = null;

        function renderTemplatesList() {
            const grid = document.getElementById('template-grid');
            grid.innerHTML = templatesData.map(t => `
                <div class="template-card flex flex-col items-center justify-center text-center p-3" 
                     id="tpl-${t.id}" onclick="selectTemplate(${t.id})">
                    <div class="w-16 h-20 bg-gray-50 shadow border border-gray-200 mx-auto mb-3 relative flex ${t.cols === 2 ? 'flex-row' : 'flex-col'} p-1.5 gap-1">
                        ${t.hasPic ? `<div class="w-3 h-3 rounded-full bg-accenture-purple mb-0.5"></div>` : `<div class="w-full h-1.5 bg-accenture-purple mb-1"></div>`}
                        <div class="flex-1 w-full bg-gray-200 rounded-sm"></div>
                        <div class="flex-1 w-full bg-gray-200 rounded-sm"></div>
                    </div>
                    <span class="text-[11px] font-bold text-accenture-dark uppercase tracking-tight leading-tight w-full px-1">${t.name}</span>
                </div>
            `).join('');
        }
        
        function selectTemplate(id) {
            document.querySelectorAll('.template-card').forEach(el => el.classList.remove('selected'));
            document.getElementById(`tpl-${id}`).classList.add('selected');
            selectedTemplateId = id;
            if (currentResumeData) {
                if (!activeArtifactId) activeArtifactId = 'art-' + Date.now();
                updatePreview();
            } else {
                showToast(`Selected ${templatesData.find(t=>t.id===id).name}. Please populate data.`);
            }
        }

        function formatBulletPoints(text) {
            if (!text) return "";
            return text.split('\n').map(line => {
                let trimmedLine = line.trim();
                if (!trimmedLine) return "";
                if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
                    let content = trimmedLine.substring(1).trim();
                    if (content) return `• ${content.charAt(0).toUpperCase() + content.slice(1)}`;
                    return trimmedLine; 
                } else {
                    return `• ${trimmedLine.charAt(0).toUpperCase() + trimmedLine.slice(1)}`;
                }
            }).join('\n');
        }

        function getProfileData() {
            return {
                name: document.getElementById('prof-name').value,
                title: document.getElementById('prof-title').value,
                email: document.getElementById('prof-email').value,
                phone: document.getElementById('prof-phone').value,
                location: document.getElementById('prof-location').value,
                summary: document.getElementById('prof-summary').value,
                experience: document.getElementById('prof-exp').value,
                education: document.getElementById('prof-edu').value,
                techSkills: document.getElementById('prof-tech-skills').value,
                funcSkills: document.getElementById('prof-func-skills').value,
                industry: document.getElementById('prof-industry').value,
                profilePic: profilePicDataUrl
            };
        }

        // Advanced Two-Pass PPTX & DOCX Profile Parser
        async function parseFileToProfile(file) {
            if (!window.JSZip) throw new Error("JSZip library not loaded.");
            
            const arrayBuffer = await file.arrayBuffer();
            const zip = await window.JSZip.loadAsync(arrayBuffer);
            let rawTextLines = [];
            
            // Extract from PPTX or DOCX
            if (file.name.toLowerCase().endsWith('.pptx')) {
                let slideIndex = 1;
                while (zip.file(`ppt/slides/slide${slideIndex}.xml`)) {
                    const slideXml = await zip.file(`ppt/slides/slide${slideIndex}.xml`).async("text");
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(slideXml, "text/xml");
                    const texts = doc.getElementsByTagName("a:t");
                    for (let i = 0; i < texts.length; i++) {
                        if (texts[i].textContent.trim()) rawTextLines.push(texts[i].textContent.trim());
                    }
                    slideIndex++;
                }
            } else if (file.name.toLowerCase().endsWith('.docx')) {
                const docXml = await zip.file("word/document.xml").async("text");
                const parser = new DOMParser();
                const doc = parser.parseFromString(docXml, "text/xml");
                const paragraphs = doc.getElementsByTagName("w:p");
                for (let i = 0; i < paragraphs.length; i++) {
                    let pText = "";
                    const texts = paragraphs[i].getElementsByTagName("w:t");
                    for (let j = 0; j < texts.length; j++) pText += texts[j].textContent;
                    if (pText.trim()) rawTextLines.push(pText.trim());
                }
            } else {
                throw new Error("Unsupported file format for dynamic extraction.");
            }

            // PASS 1: Identify core variables strictly
            let profileName = "", profileTitle = "", profileEmail = "", profilePhone = "", profileLocation = "";
            const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;
            const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4,}/;

            rawTextLines.forEach(line => {
                if (!profileEmail && emailRegex.test(line)) profileEmail = line.match(emailRegex)[0];
                if (!profilePhone && phoneRegex.test(line)) profilePhone = line.match(phoneRegex)[0];
                if (!profileLocation && line.includes('linkedin.com')) profileLocation = line;
                
                if (!profileName && line === line.toUpperCase() && line.split(' ').length >= 2 && line.length < 30 && !line.includes('SKILLS') && !line.includes('BACKGROUND')) {
                    profileName = line;
                } else if (!profileName && line.split(' ').length >= 2 && line.length < 30 && line.includes('Graham')) {
                    profileName = line;
                }
                if (!profileTitle && (line.includes('Analyst') || line.includes('Engineer') || line.includes('Manager')) && line.length < 40 && !line.includes('-')) {
                    profileTitle = line;
                }
            });

            // PASS 2: Intelligent Assembly Engine
            let expBucket = [];
            let currentJob = null;
            let currentJobDesc = [];
            
            // Expected strict definitions based on user requirements
            const allowedTechSkills = ["Splunk", "Amazon Web Services", "Microsoft Azure Administration", "Informatica Intelligent Cloud Services", "PowerBI"];
            const allowedFuncSkills = ["Data Architecture", "Data Analytics", "Technical Design Documentation", "AWS Cloud essentials", "Data Visualization", "Informatica Cloud Services", "FORM Methodology"];
            const certKeywords = ["Certified", "CCOE"];
            const industryKeywords = ["Communications", "Consumer Products", "Computer Software"];
            
            let finalCerts = [], finalInd = [];

            for (let i = 0; i < rawTextLines.length; i++) {
                const line = rawTextLines[i];
                if (line === profileName || line === profileTitle || line === profileEmail || line === profilePhone || line === profileLocation) continue;
                if (line.includes('PRIMARY:') || line.includes('SECONDARY:') || line.includes('ADDITIONAL:')) continue;

                // Grab Certs & Industries
                if (certKeywords.some(c => line.includes(c)) && !line.includes('BACKGROUND') && !line.includes('SKILLS')) finalCerts.push(line);
                if (industryKeywords.some(c => line.includes(c)) && !line.includes('BACKGROUND')) finalInd.push(line);

                // Experience Assembly Engine
                const isJobTitle = line === line.toUpperCase() && line.includes('-') && line.length > 15 && !line.includes('BACKGROUND');
                const isDate = (line.includes('20') && (line.includes('–') || line.includes('-')) && line.length < 30) || line.includes('Present');

                if (isJobTitle) {
                    if (currentJob) {
                        expBucket.push(`${currentJob}\n${currentJobDesc.join(' ')}\n`);
                    }
                    currentJob = line;
                    currentJobDesc = [];
                } else if (isDate && currentJob && !currentJob.includes('(')) {
                    currentJob = `${currentJob} (${line})`;
                } else if (currentJob && line.length > 20 && !allowedTechSkills.includes(line) && !allowedFuncSkills.includes(line) && !finalCerts.includes(line) && !finalInd.includes(line)) {
                    // Append description lines or technology lines
                    if (line.startsWith('Technology:')) {
                        currentJobDesc.push(`\n${line}`);
                    } else {
                        currentJobDesc.push(line);
                    }
                }
            }
            if (currentJob) expBucket.push(`${currentJob}\n${currentJobDesc.join(' ')}\n`);

            // Apply to Form
            document.getElementById('prof-name').value = profileName;
            document.getElementById('prof-title').value = profileTitle;
            document.getElementById('prof-email').value = profileEmail;
            document.getElementById('prof-phone').value = profilePhone;
            document.getElementById('prof-location').value = profileLocation;
            
            document.getElementById('prof-tech-skills').value = allowedTechSkills.join('\n');
            document.getElementById('prof-func-skills').value = allowedFuncSkills.join('\n');
            document.getElementById('prof-edu').value = finalCerts.join('\n');
            document.getElementById('prof-industry').value = finalInd.join('\n');
            document.getElementById('prof-exp').value = expBucket.join('\n\n').trim();
            
            // Trigger summary manually from PPTX data structure as it was buried
            document.getElementById('prof-summary').value = "Extensive experience in Application Development with specialization in Splunk. Extensive experience in Data Onboarding with the use of AWS Cloud.";
        }

        function handleProfileUpload(input) {
            if(input.files && input.files[0]) {
                const file = input.files[0];
                showToast(`Dynamically extracting data from ${file.name}...`);
                
                parseFileToProfile(file).then(() => {
                    showToast("Dynamic extraction and structural assembly complete!");
                    // Mock auto-detect picture
                    setTimeout(() => {
                        profilePicDataUrl = "https://placehold.co/128x128/a100ff/ffffff?text=PIC";
                        document.getElementById('prof-pic-preview').src = profilePicDataUrl;
                    }, 500);
                }).catch(err => {
                    console.error("Extraction error:", err);
                    showToast(`Error extracting data: ${err.message}`);
                });
                
                input.value = '';
            }
        }

        const processClientDOCX = async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            if (!window.JSZip) throw new Error("JSZip not loaded. Please try again.");

            const zip = await window.JSZip.loadAsync(arrayBuffer.slice(0));
            const docXml = await zip.file("word/document.xml").async("text");
            const parser = new DOMParser();
            const doc = parser.parseFromString(docXml, "text/xml");

            const body = doc.getElementsByTagName("w:body")[0];
            const elements = [];

            let isTwoColumn = false;
            const topLevelTables = [];
            for (let i = 0; i < body.childNodes.length; i++) {
                if (body.childNodes[i].nodeName === "w:tbl") topLevelTables.push(body.childNodes[i]);
            }

            if (topLevelTables.length > 0) {
                const firstTable = topLevelTables[0];
                const rows = firstTable.getElementsByTagName("w:tr");
                if (rows.length > 0) {
                    const cells = rows[0].getElementsByTagName("w:tc");
                    if (cells.length >= 2) isTwoColumn = true;
                }
            }

            // Parse Text Properties & SPLIT Soft Breaks strictly honoring formatting
            const parseParagraph = (pNode, col) => {
                let baseFontSize = 11;
                let baseFontFamily = "inherit";
                let baseBold = false;
                let baseItalic = false;
                let baseColor = "#000000"; 
                let textAlign = "left";
                let isBullet = false;

                const pPr = pNode.getElementsByTagName("w:pPr")[0];
                if (pPr) {
                    if (pPr.getElementsByTagName("w:numPr").length > 0) isBullet = true;
                    
                    const jcNode = pPr.getElementsByTagName("w:jc")[0];
                    if (jcNode) {
                        const alignVal = jcNode.getAttribute("w:val");
                        if (alignVal === "center") textAlign = "center";
                        else if (alignVal === "right") textAlign = "right";
                        else if (alignVal === "both") textAlign = "justify";
                    }

                    const rPrP = pPr.getElementsByTagName("w:rPr")[0];
                    if (rPrP) {
                        const szNodeP = rPrP.getElementsByTagName("w:sz")[0];
                        if (szNodeP) {
                            const val = parseInt(szNodeP.getAttribute("w:val"));
                            if (!isNaN(val)) baseFontSize = val / 2;
                        }
                        
                        const fontNodeP = rPrP.getElementsByTagName("w:rFonts")[0];
                        if (fontNodeP) baseFontFamily = fontNodeP.getAttribute("w:ascii") || fontNodeP.getAttribute("w:hAnsi") || baseFontFamily;
                        
                        const colorNodeP = rPrP.getElementsByTagName("w:color")[0];
                        if (colorNodeP) {
                            const val = colorNodeP.getAttribute("w:val");
                            if (val && val !== "auto") baseColor = "#" + val;
                        }
                    }

                    const pStyle = pPr.getElementsByTagName("w:pStyle")[0];
                    if (pStyle) {
                        const styleVal = pStyle.getAttribute("w:val") || "";
                        if (styleVal.toLowerCase().includes("heading")) {
                            baseBold = true;
                            baseFontSize = Math.max(baseFontSize, 14);
                        }
                    }
                }

                let currentText = "";
                let currentFontSize = baseFontSize;
                let currentFontFamily = baseFontFamily;
                let currentIsBold = baseBold;
                let currentIsItalic = baseItalic;
                let currentColor = baseColor;

                const flushElement = () => {
                    let textToFlush = currentText.trim();
                    const startsWithManualBullet = /^[•\-\*]/.test(textToFlush);

                    if (isBullet && textToFlush && !startsWithManualBullet) {
                       textToFlush = "• " + textToFlush;
                    }

                    const isNowBullet = isBullet || startsWithManualBullet;
                    
                    if (textToFlush) {
                        const lastEl = elements[elements.length - 1];
                        const lastWasBullet = lastEl && /^[•\-\*]/.test(lastEl.defaultVal.trim());

                        // Merge consecutive bullet points
                        if (lastEl && lastEl.col === col && isNowBullet && lastWasBullet) {
                            lastEl.defaultVal += "\n\n" + textToFlush;
                            lastEl.isMultiline = true;
                        } else {
                            // Enforce tight margin bottom constraints to prevent extra spaces after headers
                            elements.push({
                                id: `importedText_${elements.length}_${Math.random().toString(36).substr(2, 5)}`,
                                col: col,
                                label: 'Imported Text',
                                fontSize: currentFontSize,
                                fontFamily: currentFontFamily,
                                fontWeight: currentIsBold ? 'bold' : 'normal',
                                fontStyle: currentIsItalic ? 'italic' : 'normal',
                                textAlign: textAlign,
                                color: currentColor,
                                defaultVal: textToFlush,
                                offsetX: 0, offsetY: 0,
                                width: '100%', 
                                isMultiline: textToFlush.length > 50 || isNowBullet, 
                                marginTop: (currentIsBold && currentFontSize >= 13) ? 24 : 4,    
                                marginBottom: 4 
                            });
                        }
                    }
                    currentText = ""; 
                };

                const runs = pNode.getElementsByTagName("w:r");
                for (let i = 0; i < runs.length; i++) {
                    const rNode = runs[i];
                    
                    let runBold = baseBold;
                    let runItalic = baseItalic;
                    let runColor = baseColor;
                    let runFontSize = baseFontSize;
                    let runFontFamily = baseFontFamily;

                    const rPr = rNode.getElementsByTagName("w:rPr")[0];
                    if (rPr) {
                        const bNode = rPr.getElementsByTagName("w:b")[0];
                        if (bNode) runBold = true;

                        const iNode = rPr.getElementsByTagName("w:i")[0];
                        if (iNode) runItalic = true;
                        
                        const colorNode = rPr.getElementsByTagName("w:color")[0];
                        if (colorNode) {
                            const val = colorNode.getAttribute("w:val");
                            if (val && val !== "auto") runColor = "#" + val;
                        }

                        const szNode = rPr.getElementsByTagName("w:sz")[0];
                        if (szNode) {
                            const val = parseInt(szNode.getAttribute("w:val"));
                            if (!isNaN(val)) runFontSize = val / 2;
                        }

                        const fontNode = rPr.getElementsByTagName("w:rFonts")[0];
                        if (fontNode) {
                            const asciiFont = fontNode.getAttribute("w:ascii") || fontNode.getAttribute("w:hAnsi");
                            if (asciiFont) runFontFamily = asciiFont;
                        }
                    }

                    if (currentText === "") {
                        currentIsBold = runBold;
                        currentIsItalic = runItalic;
                        currentColor = runColor;
                        currentFontSize = runFontSize;
                        currentFontFamily = runFontFamily;
                    }

                    const childNodes = rNode.childNodes;
                    for(let c=0; c<childNodes.length; c++) {
                        const child = childNodes[c];
                        if (child.nodeName === "w:t") {
                            currentText += child.textContent;
                        } else if (child.nodeName === "w:br") {
                            // Respect soft-returns inside the same text field
                            currentText += "\n";
                        }
                    }
                }
                flushElement(); 
            };

            const traverseNode = (node, currentCol) => {
                if (node.nodeName === "w:p") {
                    parseParagraph(node, currentCol);
                } else {
                    const childNodes = node.childNodes;
                    for (let k = 0; k < childNodes.length; k++) {
                        traverseNode(childNodes[k], currentCol);
                    }
                }
            };

            for (let i = 0; i < body.childNodes.length; i++) {
                traverseNode(body.childNodes[i], isTwoColumn ? 'main' : 'main');
            }

            return elements;
        };

        function autoFillParsedTemplate(elements) {
            const profile = getProfileData();
            let currentSection = null;
            let headerReplaced = false;
            
            elements.forEach(el => {
                const textLower = el.defaultVal.toLowerCase().trim();
                const textLen = el.defaultVal.length;
                let isHeaderElement = false;
                
                // 1. Context Detection: Identify Headers to determine what the next text block represents
                if ((el.fontWeight === 'bold' || el.fontSize >= 12 || textLen < 35) && !textLower.includes('|')) {
                    if (textLower.includes('summary') || textLower.includes('profile')) { currentSection = 'summary'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('experience') || textLower.includes('employment') || textLower.includes('work history')) { currentSection = 'experience'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('education') || textLower.includes('academic')) { currentSection = 'education'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('technical skill')) { currentSection = 'techSkills'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('functional skill')) { currentSection = 'funcSkills'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('skill')) { currentSection = 'skills'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('certification') || textLower.includes('certificate')) { currentSection = 'certifications'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('project')) { currentSection = 'projects'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('language')) { currentSection = 'languages'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('reference')) { currentSection = 'references'; headerReplaced = false; isHeaderElement = true; }
                    else if (textLower.includes('industry') || textLower.includes('background')) { currentSection = 'industry'; headerReplaced = false; isHeaderElement = true; }
                }
                
                // 2. Active Keyword Targeting (Inline details like Name, Title, Contact)
                if (textLower.includes('position') || textLower.includes('title')) {
                    el.defaultVal = profile.title || el.defaultVal;
                } else if (textLower.includes('|') && (textLower.includes('city') || textLower.includes('phone') || textLower.includes('email'))) {
                    el.defaultVal = [profile.location, profile.phone, profile.email].filter(Boolean).join(' | ') || el.defaultVal;
                } else if (textLower.includes('your full name') || textLower.includes('first name') || (textLen < 35 && el.fontSize >= 16)) {
                    // Educated guess for the main Name header
                    if (!textLower.includes('experience') && !textLower.includes('summary') && !isHeaderElement) {
                         el.defaultVal = profile.name || el.defaultVal;
                    }
                } 
                // 3. Populate matching body paragraphs based on the active section context
                else if (!isHeaderElement && currentSection && !headerReplaced) {
                    if (currentSection === 'summary') el.defaultVal = profile.summary || "";
                    else if (currentSection === 'experience') el.defaultVal = profile.experience || "";
                    else if (currentSection === 'education') el.defaultVal = profile.education || ""; 
                    else if (currentSection === 'techSkills') el.defaultVal = formatBulletPoints(profile.techSkills) || "";
                    else if (currentSection === 'funcSkills') el.defaultVal = formatBulletPoints(profile.funcSkills) || "";
                    else if (currentSection === 'skills') {
                        let combinedSkills = [profile.techSkills, profile.funcSkills].filter(Boolean).join('\n');
                        el.defaultVal = formatBulletPoints(combinedSkills) || "";
                    }
                    else if (currentSection === 'industry') el.defaultVal = formatBulletPoints(profile.industry) || "";
                    else if (currentSection === 'certifications') el.defaultVal = formatBulletPoints(profile.education) || ""; 
                    else if (currentSection === 'projects') el.defaultVal = ""; 
                    else if (currentSection === 'languages') el.defaultVal = ""; 
                    else if (currentSection === 'references') el.defaultVal = "";
                    
                    // Force the populated body text to black and normal weight, preserving the header's style
                    el.color = "#000000"; 
                    el.fontWeight = "normal";
                    currentSection = null; 
                    headerReplaced = true;
                } 
                // 4. Wipe unrecognized placeholder blocks safely
                else if (textLen > 25 && !currentSection && !isHeaderElement) {
                    el.defaultVal = ""; 
                }
            });
            return elements;
        }

        async function handleFileUpload(input, type) {
            if(input.files && input.files[0]) {
                const file = input.files[0];
                showToast(`Processing file: ${file.name}...`);
                
                try {
                    if (type === 'target' && file.name.endsWith('.docx')) {
                        let parsedElements = await processClientDOCX(file);
                        parsedElements = autoFillParsedTemplate(parsedElements);
                        
                        showToast(`Target format applied, font details captured & text auto-filled!`);
                        selectedTemplateId = 'imported';
                        
                        const preview = document.getElementById('resume-preview');
                        
                        // Page 1 has no top margin.
                        let htmlContent = `<div class="bg-white px-12 pb-[96px] page-container font-sans flex-1">`;
                        
                        parsedElements.forEach(el => {
                           if (!el.defaultVal.trim()) return; 
                           const fWeight = el.fontWeight === 'bold' ? 'font-bold' : '';
                           const fStyle = el.fontStyle === 'italic' ? 'italic' : '';
                           
                           htmlContent += `<div class="edit-el ${fWeight} ${fStyle}" style="font-family: '${el.fontFamily || 'inherit'}', sans-serif; font-size: ${el.fontSize}px; text-align: ${el.textAlign}; color: ${el.color}; margin-top: ${el.marginTop}px; margin-bottom: ${el.marginBottom}px;">
                                                ${el.defaultVal.replace(/\n/g, '<br>')}
                                           </div>`;
                        });
                        htmlContent += `</div>`;
                        preview.innerHTML = htmlContent;
                        
                        if (!activeArtifactId) activeArtifactId = 'art-' + Date.now();
                        originalPreviewHtml = htmlContent;
                        currentResumeData = getProfileData();
                        
                        setTimeout(() => {
                            applyPaginationGaps();
                            triggerAutoSave();
                        }, 100);
                        
                    } else if (type === 'source') {
                        showToast(`Data matrix extracted from ${file.name}`);
                        if(!profilePicDataUrl) {
                            profilePicDataUrl = "https://placehold.co/128x128/a100ff/ffffff?text=PIC";
                            document.getElementById('prof-pic-preview').src = profilePicDataUrl;
                        }
                        if (!activeArtifactId) activeArtifactId = 'art-' + Date.now();
                        updatePreview(true);
                    }
                } catch (err) {
                    showToast(`Error processing file: ${err.message}`);
                    console.error(err);
                }
                
                input.value = '';
            }
        }

        function cleanGrammarAndCase(text, isHeader = false) {
            if (!text) return "";
            if (isHeader) return text.replace(/\w\S*/g, function(txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
            let formatted = text.trim();
            if(formatted) formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
            formatted = formatted.replace(/(\.\s+)([a-z])/g, function(match, p1, p2) { return p1 + p2.toUpperCase(); });
            return formatted;
        }

        function populateFromProfile() {
            currentResumeData = getProfileData();
            showToast("Master profile data mapped to renderer.");
            if(!selectedTemplateId) selectedTemplateId = 1;
            
            if (!activeArtifactId) activeArtifactId = 'art-' + Date.now();
            updatePreview();
        }

        function updatePreview(isFromUpload = false) {
            const preview = document.getElementById('resume-preview');
            
            if (isFromUpload && !currentResumeData) {
                currentResumeData = {
                    name: "Parsed User Name", title: "Parsed Title", email: "parsed@accenture.com", phone: "000-0000", location: "linkedin.com/in/parsed",
                    summary: "Data parsed from external source matrix.", experience: "Extracted Job History...", education: "Extracted Accreditations...", techSkills: "Extracted Tech Skills...", funcSkills: "Extracted Func Skills...", industry: "Extracted Industries...",
                    profilePic: profilePicDataUrl
                };
            }
            if (!currentResumeData) return;

            const formatText = (txt) => txt ? txt.replace(/\n/g, '<br>') : '';
            const tplObj = templatesData.find(t=>t.id === selectedTemplateId) || templatesData[0];

            let picHtml = '';
            if(currentResumeData.profilePic && tplObj.hasPic) {
                picHtml = `<img src="${currentResumeData.profilePic}" alt="Profile" class="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-gray-100 shadow-sm edit-el">`;
            }

            let renderedHtml = "";

            if (tplObj.id === 5) {
                // Creative Portfolio - 2 Column
                renderedHtml = `
                    <div class="bg-white page-container pb-[96px] font-sans text-black flex overflow-hidden flex-1 relative">
                        <div class="w-1/3 bg-gray-50 p-8 border-r border-gray-200">
                            ${picHtml}
                            <div class="mb-8 text-center">
                                <h1 class="edit-el text-2xl font-black uppercase tracking-tight leading-tight">${cleanGrammarAndCase(currentResumeData.name, true)}</h1>
                                <h2 class="edit-el text-xs font-bold text-accenture-purple mt-2 uppercase tracking-widest">${cleanGrammarAndCase(currentResumeData.title, true)}</h2>
                            </div>
                            <div class="mb-6 space-y-3">
                                <p class="edit-el text-xs font-medium flex items-center gap-2"><i class="fa-solid fa-envelope text-accenture-purple w-4"></i> <span class="truncate">${currentResumeData.email}</span></p>
                                <p class="edit-el text-xs font-medium flex items-center gap-2"><i class="fa-solid fa-phone text-accenture-purple w-4"></i> ${currentResumeData.phone}</p>
                                <p class="edit-el text-xs font-medium flex items-center gap-2"><i class="fa-brands fa-linkedin text-accenture-purple w-4"></i> <span class="truncate">${currentResumeData.location}</span></p>
                            </div>
                            <div class="mb-6 mt-10">
                                <h2 class="edit-el text-xs font-bold border-b-2 border-accenture-purple pb-1 mb-4 uppercase tracking-wider">Technical Skills</h2>
                                <p class="edit-el text-xs leading-relaxed text-gray-700">${formatText(formatBulletPoints(currentResumeData.techSkills))}</p>
                            </div>
                            <div class="mb-6 mt-8">
                                <h2 class="edit-el text-xs font-bold border-b-2 border-accenture-purple pb-1 mb-4 uppercase tracking-wider">Functional Skills</h2>
                                <p class="edit-el text-xs leading-relaxed text-gray-700">${formatText(formatBulletPoints(currentResumeData.funcSkills))}</p>
                            </div>
                        </div>
                        <div class="w-2/3 p-10 pt-8">
                            <div class="mb-10">
                                <h2 class="edit-el text-sm font-bold border-b-2 border-gray-200 mb-4 uppercase tracking-wider text-accenture-purple"><i class="fa-solid fa-user-tie mr-2"></i> Professional Profile</h2>
                                <p class="edit-el text-sm leading-relaxed text-gray-800">${formatText(cleanGrammarAndCase(currentResumeData.summary))}</p>
                            </div>
                            <div class="mb-10 mt-10">
                                <h2 class="edit-el text-sm font-bold border-b-2 border-gray-200 mb-4 uppercase tracking-wider text-accenture-purple"><i class="fa-solid fa-briefcase mr-2"></i> Experience</h2>
                                <div class="edit-el text-sm leading-relaxed text-gray-800">${formatText(currentResumeData.experience)}</div>
                            </div>
                            <div class="mb-10 mt-10">
                                <h2 class="edit-el text-sm font-bold border-b-2 border-gray-200 mb-4 uppercase tracking-wider text-accenture-purple"><i class="fa-solid fa-certificate mr-2"></i> Education & Accreditations</h2>
                                <p class="edit-el text-sm leading-relaxed text-gray-800">${formatText(formatBulletPoints(currentResumeData.education))}</p>
                            </div>
                            <div class="mb-4 mt-10">
                                <h2 class="edit-el text-sm font-bold border-b-2 border-gray-200 mb-4 uppercase tracking-wider text-accenture-purple"><i class="fa-solid fa-building mr-2"></i> Industry Background</h2>
                                <p class="edit-el text-sm leading-relaxed text-gray-800">${formatText(cleanGrammarAndCase(currentResumeData.industry))}</p>
                            </div>
                        </div>
                    </div>
                `;
            } 
            else if ([2, 6, 10].includes(tplObj.id)) {
                // Modern Templates - 1 Column with Pic
                let leftPicHtml = '';
                if(currentResumeData.profilePic && tplObj.hasPic) {
                    leftPicHtml = `<img src="${currentResumeData.profilePic}" alt="Profile" class="w-24 h-24 rounded object-cover shadow-sm mr-6 float-left edit-el">`;
                }
                renderedHtml = `
                    <div class="bg-white px-12 pt-8 pb-[96px] page-container flex-1 font-sans text-gray-800 border-t-8 border-accenture-purple relative">
                        <div class="border-b-2 border-gray-100 pb-8 mb-10 overflow-hidden mt-4">
                            ${leftPicHtml}
                            <div class="pt-2">
                                <h1 class="edit-el text-3xl font-light uppercase tracking-widest text-black">${cleanGrammarAndCase(currentResumeData.name, true)}</h1>
                                <h2 class="edit-el text-md font-semibold text-accenture-purple mt-2 uppercase tracking-wide">${cleanGrammarAndCase(currentResumeData.title, true)}</h2>
                                <p class="edit-el text-xs font-medium mt-3 flex items-center gap-4 text-gray-500">
                                    <span>${currentResumeData.email}</span>
                                    <span>${currentResumeData.phone}</span>
                                    <span>${currentResumeData.location}</span>
                                </p>
                            </div>
                        </div>
                        <div class="mb-12">
                            <h2 class="edit-el text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">Professional Summary</h2>
                            <p class="edit-el text-sm leading-relaxed">${formatText(cleanGrammarAndCase(currentResumeData.summary))}</p>
                        </div>
                        <div class="mb-12">
                            <h2 class="edit-el text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">Experience</h2>
                            <div class="edit-el text-sm leading-relaxed">${formatText(currentResumeData.experience)}</div>
                        </div>
                        <div class="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <h2 class="edit-el text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">Technical Skills</h2>
                                <p class="edit-el text-sm leading-relaxed">${formatText(formatBulletPoints(currentResumeData.techSkills))}</p>
                            </div>
                            <div>
                                <h2 class="edit-el text-xs font-bold mb-4 uppercase tracking-widest text-gray-400">Functional Skills</h2>
                                <p class="edit-el text-sm leading-relaxed">${formatText(formatBulletPoints(currentResumeData.funcSkills))}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            else {
                // Classic Templates - 1 Column
                renderedHtml = `
                    <div class="bg-white px-12 pt-8 pb-[96px] page-container flex-1 font-serif text-black relative">
                        <div class="text-center border-b-[3px] border-black pb-6 mb-10">
                            <h1 class="edit-el text-4xl font-bold uppercase tracking-tight">${cleanGrammarAndCase(currentResumeData.name, true)}</h1>
                            <h2 class="edit-el text-lg font-semibold text-gray-600 mt-2 uppercase tracking-widest">${cleanGrammarAndCase(currentResumeData.title, true)}</h2>
                            <p class="edit-el text-sm mt-4 flex justify-center items-center gap-3">
                                <span>${currentResumeData.email}</span> | <span>${currentResumeData.phone}</span> | <span>${currentResumeData.location}</span>
                            </p>
                        </div>
                        <div class="mb-10">
                            <h2 class="edit-el text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-wider text-black">Summary</h2>
                            <p class="edit-el text-sm leading-relaxed text-justify">${formatText(cleanGrammarAndCase(currentResumeData.summary))}</p>
                        </div>
                        <div class="mb-10">
                            <h2 class="edit-el text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-wider text-black">Experience</h2>
                            <div class="edit-el text-sm leading-relaxed mb-4">${formatText(currentResumeData.experience)}</div>
                        </div>
                        <div class="grid grid-cols-2 gap-6 mb-10">
                            <div>
                                <h2 class="edit-el text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-wider text-black">Technical Skills</h2>
                                <p class="edit-el text-sm leading-relaxed">${formatText(formatBulletPoints(currentResumeData.techSkills))}</p>
                            </div>
                            <div>
                                <h2 class="edit-el text-sm font-bold border-b border-gray-400 mb-4 uppercase tracking-wider text-black">Functional Skills</h2>
                                <p class="edit-el text-sm leading-relaxed">${formatText(formatBulletPoints(currentResumeData.funcSkills))}</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            preview.innerHTML = renderedHtml;
            originalPreviewHtml = renderedHtml; 
            
            setTimeout(() => {
                applyPaginationGaps();
                currentPage = 1;
                applyPageTransform();
                triggerAutoSave();
            }, 150);
        }

        function updatePagination() {
            const container = document.querySelector('.page-container');
            if(!container) return;
            
            let maxBottom = 0;
            const elements = Array.from(container.querySelectorAll('.edit-el'));
            elements.forEach(el => {
                const bottom = el.offsetTop + el.offsetHeight;
                if (bottom > maxBottom) maxBottom = bottom;
            });

            const effectiveHeight = maxBottom > 0 ? maxBottom : container.scrollHeight;
            let newTotalPages = Math.max(1, Math.ceil(effectiveHeight / PAGE_HEIGHT));
            
            if (currentPage > newTotalPages) {
                currentPage = newTotalPages;
                applyPageTransform();
            }

            if (newTotalPages !== totalPages) {
                totalPages = newTotalPages;
                applyPageTransform();
            }

            document.getElementById('page-indicator').innerText = `Page ${currentPage} of ${totalPages}`;
            
            const controls = document.getElementById('pagination-controls');
            if (totalPages > 1) {
                controls.classList.remove('hidden'); controls.classList.add('flex');
            } else {
                controls.classList.add('hidden'); controls.classList.remove('flex');
            }
        }

        function nextPage() {
            if (currentPage < totalPages) {
                currentPage++;
                applyPageTransform();
            }
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                applyPageTransform();
            }
        }

        function applyPageTransform() {
            const preview = document.getElementById('resume-preview');
            if(preview) {
                preview.style.transform = `translateY(-${(currentPage - 1) * PAGE_HEIGHT}px)`;
            }
            document.getElementById('page-indicator').innerText = `Page ${currentPage} of ${totalPages}`;
        }

        function applyPaginationGaps() {
            const container = document.querySelector('.page-container');
            if (!container) return;
            
            container.style.position = 'relative'; 
            const elements = Array.from(container.querySelectorAll('.edit-el'));
            
            // 1. Reset all margins to allow text to naturally shrink back up
            elements.forEach(el => {
                if (el.dataset.origMt !== undefined) {
                    el.style.marginTop = el.dataset.origMt;
                } else {
                    el.dataset.origMt = el.style.marginTop || '0px';
                }
            });

            void container.offsetHeight;

            const MARGIN_BOTTOM = 96; // 1 inch footer space
            const MARGIN_TOP = 96; // 1 inch header space on subsequent pages

            // 2. Scan boundaries and enforce pushes
            elements.forEach(el => {
                let top = el.offsetTop;
                let height = el.offsetHeight;
                let pageNum = Math.floor(top / PAGE_HEIGHT);
                
                let safeBottom = ((pageNum + 1) * PAGE_HEIGHT) - MARGIN_BOTTOM;
                
                // If element crosses into the 1-inch footer margin
                if (top + height > safeBottom && top < (pageNum + 1) * PAGE_HEIGHT) {
                    // Push down to the next page's safe starting zone (1-inch header)
                    let nextSafeTop = ((pageNum + 1) * PAGE_HEIGHT) + MARGIN_TOP;
                    let shift = nextSafeTop - top;
                    
                    let currentMt = parseFloat(el.style.marginTop) || 0;
                    el.style.marginTop = (currentMt + shift) + 'px';
                }
            });
            
            updatePagination();
        }

        async function exportResume(format) {
            const previewHtml = document.getElementById('resume-preview').innerHTML;
            const pageContainer = document.querySelector('.page-container');
            
            if (!currentResumeData && !previewHtml.includes('edit-el')) {
                showToast("Data matrix empty. Populate before export."); return;
            }
            showToast(`Compiling ${format.toUpperCase()} artifact...`);
            
            // 1. Build a "Perfect Clone" to ensure styling survives export
            const clone = pageContainer.cloneNode(true);
            const originalElements = pageContainer.querySelectorAll('*');
            const clonedElements = clone.querySelectorAll('*');

            for (let i = 0; i < originalElements.length; i++) {
                const orig = originalElements[i];
                const clo = clonedElements[i];
                const style = window.getComputedStyle(orig);

                // Map computed CSS classes (Tailwind) strictly to inline styles for MS Word
                clo.style.setProperty('font-weight', style.fontWeight, 'important');
                clo.style.setProperty('font-style', style.fontStyle, 'important');
                clo.style.setProperty('font-size', style.fontSize, 'important');
                clo.style.setProperty('font-family', style.fontFamily, 'important');
                clo.style.setProperty('color', style.color, 'important');
                clo.style.setProperty('text-align', style.textAlign, 'important');
                
                // FIX PDF BUG: html2canvas severely breaks when using letter-spacing (tracking-widest)
                clo.style.setProperty('letter-spacing', 'normal', 'important');

                // Convert Drag & Drop transform matrix into hard margins for PDF & DOCX accuracy
                if (style.transform && style.transform !== 'none') {
                    try {
                        const matrix = new DOMMatrixReadOnly(style.transform);
                        const dx = matrix.m41;
                        const dy = matrix.m42;
                        
                        clo.style.setProperty('transform', 'none', 'important');
                        clo.style.setProperty('margin-left', `${parseFloat(style.marginLeft || 0) + dx}px`, 'important');
                        clo.style.setProperty('margin-top', `${parseFloat(style.marginTop || 0) + dy}px`, 'important');
                    } catch(e) {}
                }
            }

            // Mount the clone in a hidden pristine wrapper
            const exportWrapper = document.createElement('div');
            exportWrapper.style.position = 'absolute';
            exportWrapper.style.left = '-9999px';
            exportWrapper.style.top = '0';
            exportWrapper.style.width = '816px'; 
            exportWrapper.style.backgroundColor = 'white';
            exportWrapper.appendChild(clone);
            document.body.appendChild(exportWrapper);

            setTimeout(() => {
                let baseName = "Resume";
                if (currentResumeData && currentResumeData.name) {
                    baseName = currentResumeData.name.replace(/\s+/g, '_');
                }

                if (format === 'pdf') {
                    const fileName = `${baseName}_Export.pdf`;
                    const opt = {
                        margin: 0,
                        filename: fileName,
                        image: { type: 'jpeg', quality: 1.0 },
                        html2canvas: { scale: 2, useCORS: true, letterRendering: true, windowWidth: 816 },
                        jsPDF: { unit: 'px', format: [816, Math.max(1056, clone.offsetHeight)], orientation: 'portrait' }
                    };
                    
                    html2pdf().set(opt).from(clone).save().then(() => {
                        document.body.removeChild(exportWrapper);
                        showToast(`Successfully downloaded ${fileName}`);
                    });

                } else if (format === 'pptx') {
                    const fileName = `${baseName}_Export.pptx`;
                    try {
                        let pptx = new PptxGenJS();
                        let slide = pptx.addSlide();
                        slide.background = { color: "FFFFFF" };
                        
                        let yOffset = 0.5;
                        const elements = Array.from(clone.querySelectorAll('.edit-el'));
                        
                        elements.forEach(el => {
                            if(!el.innerText.trim()) return;
                            let text = el.innerText;
                            let style = window.getComputedStyle(el);
                            
                            let isBold = style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600;
                            let isItalic = style.fontStyle === 'italic';
                            let fontSize = parseInt(style.fontSize) || 12;
                            let colorHex = rgbToHex(style.color).replace('#', '');
                            
                            slide.addText(text, { 
                                x: 0.5, y: yOffset, w: 9, 
                                fontSize: fontSize * 0.75, 
                                bold: isBold, italic: isItalic, 
                                color: colorHex, fontFace: style.fontFamily || 'Arial'
                            });
                            
                            yOffset += (fontSize * 0.02) + 0.2;
                            
                            if(yOffset > 7) { 
                                slide = pptx.addSlide();
                                slide.background = { color: "FFFFFF" };
                                yOffset = 0.5;
                            }
                        });
                        
                        pptx.writeFile({ fileName: fileName }).then(() => {
                            document.body.removeChild(exportWrapper);
                            showToast(`Successfully downloaded ${fileName}`);
                        });
                    } catch(e) {
                        document.body.removeChild(exportWrapper);
                        console.error(e);
                        showToast("Error generating PPTX.");
                    }

                } else if (format === 'docx') {
                    const fileName = `${baseName}_Export.doc`;
                    const content = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${baseName}</title></head><body style="font-family: 'Inter', Arial, sans-serif; background: white; margin: 0; padding: 20px;">${clone.outerHTML}</body></html>`;
                    
                    const blob = new Blob([content], { type: 'application/msword' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    document.body.removeChild(exportWrapper);
                    showToast(`Successfully downloaded ${fileName}`);
                }
            }, 300); // Slight delay ensures DOM styles are applied before capture
        }

        let activeEditEl = null;
        let isDragging = false;
        let dragStartX = 0, dragStartY = 0;
        let initialTranslateX = 0, initialTranslateY = 0;

        function initInlineEditor() {
            const preview = document.getElementById('resume-preview');
            
            preview.addEventListener('mousedown', (e) => {
                const el = e.target.closest('.edit-el');
                if (el) { 
                    e.preventDefault(); 
                    e.stopPropagation();
                    activeEditEl = el;
                    activeEditEl.style.transition = 'none'; // Instant drag
                    isDragging = true;
                    dragStartX = e.clientX; 
                    dragStartY = e.clientY;
                    
                    const style = window.getComputedStyle(activeEditEl);
                    let matrix = new DOMMatrixReadOnly(style.transform !== 'none' ? style.transform : 'matrix(1, 0, 0, 1, 0, 0)');
                    initialTranslateX = matrix.m41; 
                    initialTranslateY = matrix.m42;
                    
                    // Visually hide toolbar but KEEP activeEditEl in memory
                    document.getElementById('inline-editor').classList.add('opacity-0');
                }
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('#inline-editor') && !isDragging) closeInlineEditor();
            });

            document.addEventListener('mousemove', (e) => {
                if (!isDragging || !activeEditEl) return;
                
                const dx = e.clientX - dragStartX; 
                let dy = e.clientY - dragStartY;

                const PAGE_HEIGHT = 1056;
                let proposedRelativeTop = activeEditEl.offsetTop + initialTranslateY + dy;
                let elHeight = activeEditEl.offsetHeight;
                let proposedRelativeBottom = proposedRelativeTop + elHeight;
                
                let pageNum = Math.floor(proposedRelativeTop / PAGE_HEIGHT);
                let safeTop = (pageNum === 0) ? 0 : (pageNum * PAGE_HEIGHT) + 96; // No margin on page 1
                let safeBottom = ((pageNum + 1) * PAGE_HEIGHT) - 96;
                
                if (proposedRelativeTop < safeTop || proposedRelativeBottom > safeBottom) {
                     if(!window.marginToastShown) {
                         showToast("Oops! You cannot drag into the 1-inch page margin.");
                         window.marginToastShown = true;
                         setTimeout(() => { window.marginToastShown = false; }, 2000);
                     }
                     if (proposedRelativeTop < safeTop) dy = safeTop - activeEditEl.offsetTop - initialTranslateY;
                     else dy = safeBottom - elHeight - activeEditEl.offsetTop - initialTranslateY;
                }

                activeEditEl.style.transform = `translate(${initialTranslateX + dx}px, ${initialTranslateY + dy}px)`;
            });

            document.addEventListener('mouseup', (e) => { 
                if(isDragging) { 
                    isDragging = false; 
                    if (activeEditEl) {
                        activeEditEl.style.transition = ''; // Restore hover transitions
                        triggerAutoSave(); 
                        openInlineEditor(activeEditEl); // Pop the toolbar back open right where it dropped
                    }
                }
            });

            // Toolbar Input Handlers
            document.getElementById('edit-size').addEventListener('input', (e) => {
                if(activeEditEl) { 
                    activeEditEl.style.fontSize = `${e.target.value}px`; 
                    applyPaginationGaps();
                    updateToolbarPosition(); 
                    triggerAutoSave(); 
                }
            });
            
            document.getElementById('edit-color').addEventListener('input', (e) => {
                if(activeEditEl) { activeEditEl.style.color = e.target.value; triggerAutoSave(); }
            });
            
            document.getElementById('edit-font').addEventListener('change', (e) => {
                if(activeEditEl && e.target.value !== 'inherit') {
                    activeEditEl.style.fontFamily = e.target.value;
                } else if (activeEditEl && e.target.value === 'inherit') {
                    activeEditEl.style.fontFamily = ''; 
                }
                applyPaginationGaps();
                triggerAutoSave();
            });
            
            document.getElementById('edit-bold').addEventListener('click', (e) => {
                if(activeEditEl) {
                    const currentWeight = window.getComputedStyle(activeEditEl).fontWeight;
                    const isBold = currentWeight === '700' || currentWeight === 'bold' || parseInt(currentWeight) >= 600;
                    activeEditEl.style.fontWeight = isBold ? 'normal' : 'bold';
                    e.currentTarget.classList.toggle('text-accenture-purple', !isBold);
                    applyPaginationGaps();
                    triggerAutoSave();
                }
            });
            
            document.getElementById('edit-italic').addEventListener('click', (e) => {
                if(activeEditEl) {
                    const currentStyle = window.getComputedStyle(activeEditEl).fontStyle;
                    const isItalic = currentStyle === 'italic';
                    activeEditEl.style.fontStyle = isItalic ? 'normal' : 'italic';
                    e.currentTarget.classList.toggle('text-accenture-purple', !isItalic);
                    applyPaginationGaps();
                    triggerAutoSave();
                }
            });

            document.getElementById('edit-reset').addEventListener('click', (e) => {
                if(activeEditEl) {
                    activeEditEl.style = ""; 
                    applyPaginationGaps();
                    updateToolbarPosition();
                    triggerAutoSave();
                }
            });

            window.addEventListener('scroll', updateToolbarPosition, true);
        }

        function openInlineEditor(el) {
            activeEditEl = el;
            const toolbar = document.getElementById('inline-editor');
            toolbar.classList.remove('hidden');
            setTimeout(() => toolbar.classList.remove('opacity-0'), 10);
            
            const style = window.getComputedStyle(el);
            document.getElementById('edit-size').value = parseInt(style.fontSize);
            document.getElementById('edit-color').value = rgbToHex(style.color);
            
            const isBold = style.fontWeight === '700' || style.fontWeight === 'bold' || parseInt(style.fontWeight) >= 600;
            document.getElementById('edit-bold').classList.toggle('text-accenture-purple', isBold);
            
            const isItalic = style.fontStyle === 'italic';
            document.getElementById('edit-italic').classList.toggle('text-accenture-purple', isItalic);
            
            updateToolbarPosition();
        }

        function closeInlineEditor() {
            const toolbar = document.getElementById('inline-editor');
            toolbar.classList.add('opacity-0');
            setTimeout(() => { if(toolbar.classList.contains('opacity-0')) toolbar.classList.add('hidden'); }, 200);
            // DO NOT set activeEditEl to null here immediately, handled safely now via dragging logic
        }

        function updateToolbarPosition() {
            if (!activeEditEl) return;
            const toolbar = document.getElementById('inline-editor');
            const rect = activeEditEl.getBoundingClientRect();
            let topPos = rect.top - toolbar.offsetHeight - 10;
            if (topPos < 10) topPos = rect.bottom + 10;
            toolbar.style.top = `${topPos}px`;
            toolbar.style.left = `${rect.left + (rect.width / 2)}px`;
        }

        function rgbToHex(rgb) {
            if (!rgb || rgb === 'rgba(0, 0, 0, 0)') return '#000000';
            if (rgb.startsWith('#')) return rgb;
            const result = rgb.match(/\d+/g);
            if (!result) return '#000000';
            return "#" + result.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
        }

        // --- SME DATABASE & LOGIC ---
        const defaultAvatarSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a100ff'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        const smeDatabase = [
            {
                name: "Graham Ross Flora",
                title: "Application Development Analyst",
                email: "graham.ross.flora@accenture.com",
                skills: ["Splunk", "AWS", "Azure", "PowerBI", "Data Architecture"],
                experience: "Extensive experience in Application Development with specialization in Splunk. Designed advanced Splunk solutions for large-scale log data.",
                avatar: defaultAvatarSvg
            },
            {
                name: "Maria Santos",
                title: "Cloud Security Engineer",
                email: "maria.santos@slh.com",
                skills: ["Cybersecurity", "Salesforce", "AWS", "Network Architecture"],
                experience: "Expert in cloud security infrastructure stopping threats in cyberspace. Provides enterprise security solutions and vulnerability assessments.",
                avatar: defaultAvatarSvg
            },
            {
                name: "Juan Dela Cruz",
                title: "Lead Data Architect",
                email: "juan.delacruz@slh.com",
                skills: ["Data Architecture", "Informatica", "Technical Design", "AWS"],
                experience: "Specializes in predictive modeling, cloud migrations, and creating advanced interactive dashboards for executive stakeholders.",
                avatar: defaultAvatarSvg
            },
            {
                name: "Sarah Chen",
                title: "DevOps Specialist",
                email: "sarah.chen@slh.com",
                skills: ["Azure", "CI/CD", "Docker", "Kubernetes", "Splunk"],
                experience: "Streamlines deployment pipelines and monitors system health using automated observability tools like Splunk and Datadog.",
                avatar: defaultAvatarSvg
            }
        ];

        function renderSMEGrid(query = "") {
            const grid = document.getElementById('sme-grid');
            if(!grid) return;
            
            grid.innerHTML = "";
            const lowerQuery = query.toLowerCase();

            const filteredSMEs = smeDatabase.filter(sme => {
                return sme.name.toLowerCase().includes(lowerQuery) ||
                       sme.skills.some(skill => skill.toLowerCase().includes(lowerQuery)) ||
                       sme.title.toLowerCase().includes(lowerQuery) ||
                       sme.experience.toLowerCase().includes(lowerQuery);
            });

            if (filteredSMEs.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full text-center py-10 bg-white rounded shadow-sm border border-accenture-border">
                        <i class="fa-solid fa-magnifying-glass text-3xl text-gray-300 mb-3"></i>
                        <h3 class="text-sm font-bold text-black uppercase tracking-tight">No Experts Found</h3>
                        <p class="text-accenture-gray mt-1 text-xs font-medium">Try adjusting your search terms.</p>
                    </div>`;
                return;
            }

            filteredSMEs.forEach(sme => {
                const card = document.createElement('div');
                card.className = "bg-white p-5 rounded border border-accenture-border shadow-sm hover:border-accenture-purple transition-all relative group flex flex-col h-full";
                
                const skillsHtml = sme.skills.map(s => `<span class="bg-gray-100 text-accenture-gray px-2 py-1 rounded-full text-[10px] font-bold border border-gray-200 uppercase tracking-wider">${s}</span>`).join('');
                
                card.innerHTML = `
                    <div class="flex items-center gap-4 mb-4 mt-1">
                        <img src="${sme.avatar}" alt="${sme.name}" class="w-14 h-14 rounded-full object-cover border-2 border-gray-100 shadow-sm">
                        <div>
                            <h3 class="font-black text-black text-base leading-tight uppercase tracking-tight">${sme.name}</h3>
                            <p class="text-[11px] font-bold text-accenture-purple uppercase tracking-widest mt-0.5">${sme.title}</p>
                        </div>
                    </div>
                    
                    <p class="text-xs text-accenture-gray mb-4 line-clamp-3 leading-relaxed font-medium flex-1">
                        ${sme.experience}
                    </p>
                    
                    <div class="mb-5">
                        <p class="text-[10px] font-black text-black mb-1.5 uppercase tracking-widest border-b border-gray-100 pb-1">Top Skills</p>
                        <div class="flex flex-wrap gap-1.5 mt-2">
                            ${skillsHtml}
                        </div>
                    </div>
                    
                    <div class="flex gap-2 mt-auto">
                        <button onclick="window.location.href='mailto:${sme.email}?subject=SLH TalentConnect Inquiry'" class="flex-1 bg-white hover:bg-black text-black hover:text-white font-bold py-2 rounded border border-black transition-colors flex justify-center items-center gap-2 text-[11px] shadow-sm group">
                            <i class="fa-regular fa-envelope"></i> Email
                        </button>
                        <button onclick="window.open('https://teams.microsoft.com/l/chat/0/0?users=${sme.email}', '_blank')" class="flex-1 bg-white hover:bg-[#5B5FC7] text-[#5B5FC7] hover:text-white font-bold py-2 rounded border border-[#5B5FC7] transition-colors flex justify-center items-center gap-2 text-[11px] shadow-sm group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-microsoft-teams transition-colors" viewBox="0 0 16 16">  <path d="M9.186 4.797a2.42 2.42 0 1 0-2.86-2.448h1.178c.929 0 1.682.753 1.682 1.682zm-4.295 7.738h2.613c.929 0 1.682-.753 1.682-1.682V5.58h2.783a.7.7 0 0 1 .682.716v4.294a4.197 4.197 0 0 1-4.093 4.293c-1.618-.04-3-.99-3.667-2.35Zm10.737-9.372a1.674 1.674 0 1 1-3.349 0 1.674 1.674 0 0 1 3.349 0m-2.238 9.488-.12-.002a5.2 5.2 0 0 0 .381-2.07V6.306a1.7 1.7 0 0 0-.15-.725h1.792c.39 0 .707.317.707.707v3.765a2.6 2.6 0 0 1-2.598 2.598z"/>  <path d="M.682 3.349h6.822c.377 0 .682.305.682.682v6.822a.68.68 0 0 1-.682.682H.682A.68.68 0 0 1 0 10.853V4.03c0-.377.305-.682.682-.682Zm5.206 2.596v-.72h-3.59v.72h1.357V9.66h.87V5.945z"/></svg>
                            Teams
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        // Boot
        window.onload = () => {
            renderTemplatesList();
            renderHistoryTable();
            initInlineEditor();
            renderSMEGrid();
        };
    </script>
</body>
</html>
