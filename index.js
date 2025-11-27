import './index.css';
// ⛔️ Removed all Three.js and visualizer imports

// ============================================
// D-ID RAW STREAMS API CONFIGURATION  
// ============================================
const DID_API = {
  url: 'https://api.d-id.com',
  key: "ZGhlZXJhai5kaGF3YW5AZHJlYW1icmlkZ2UuZ2xvYmFs:t2A8bui_EPkp4aVwpTRaf"
};

// ⛔️ Removed 'viz' global object

let isStartIntroIsDone = false;
const agentId = "v2_agt_7fdQs7OJ"; // Your Premium+ Agent ID

const continueButton = document.getElementById('continueButton');
const continuepage = document.getElementById('continuepage');
const mainPage = document.querySelector('.content-section'); // Selects the class instead

let isAgentLoaded = false;
let isVideoStreamReady = false; // Track if video stream has started

// Preset video configuration for each scenario
const presetVideos = {
  medical: './assets/life_senario.mp4', // Replace with your actual video URL
  manufacturing: 'https://your-video-url.com/manufacturing-intro.mp4',
  technology: 'https://your-video-url.com/technology-intro.mp4'
};

// Track current video state
let isPresetVideoPlaying = false;

continueButton.addEventListener('click', async () => {
  // Initialize agent on first click if not already loaded
  if (!isAgentLoaded) {
    continueButton.textContent = 'Connecting...';
    continueButton.disabled = true;
    
    await initializeAgent();
    
    // Wait for video stream to be ready (with timeout)
    let attempts = 0;
    while (!isVideoStreamReady && attempts < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      attempts++;
    }
    
    if (!isVideoStreamReady) {
      console.warn('⚠️ Video stream not ready after timeout, continuing anyway');
    }
    
    continueButton.textContent = 'Continue';
    continueButton.disabled = false;
  }
  
  // Only allow transition if video stream is ready
  if (!isVideoStreamReady && isAgentLoaded) {
    console.log('⏳ Waiting for video stream to be ready...');
    continueButton.textContent = 'Loading video...';
    continueButton.disabled = true;
    return;
  }
  
  // STEP 1: Make video visible FIRST (but keep intro page visible)
  const appContainer = document.getElementById('app-container');
  if (appContainer) {
    console.log('🎥 Making video visible...');
    appContainer.style.opacity = '1';
    appContainer.style.transition = 'opacity 0.5s ease';
  }
  
  // STEP 2: Wait for video to render, then hide intro page to reveal glassmorphic UI
  // await new Promise(resolve => setTimeout(resolve, 4000)); // Wait for video fade-in
  
  console.log('✨ Revealing glassmorphic UI...');
  
  // Fade out intro page
  if (continuepage) {
    continuepage.style.transition = 'opacity 0.5s ease';
    continuepage.style.opacity = '0';
    
    // Remove from DOM after fade
    setTimeout(() => {
      continuepage.style.display = 'none';
      requestAnimationFrame(() => {
          const cs = document.querySelector('.content-section');
          if (cs) cs.style.transform = 'translateZ(0)';
        });
    }, 500);
  }
  
  // Show main page
  if (mainPage) {
    mainPage.style.display = 'block';
  }

// === REPLACE THE PREVIOUS requestAnimationFrame BLOCK WITH THIS ===
setTimeout(() => {
      // 1. Select the elements that have the glass effect
      const glassElements = document.querySelectorAll('.glass, .domain-card, .header, .instruction');
      
      glassElements.forEach(el => {
          // 2. Forcefully hide them from the layout tree
          el.style.display = 'none';
      });

      // 3. Bring them back in the next frame
      requestAnimationFrame(() => {
          glassElements.forEach(el => {
              el.style.display = ''; // Removes inline style, reverting to CSS class
          });
      });
  }, 100); // Small delay to ensure the Canvas is running
      
  // If connection is already ready, trigger introduction now
  // Otherwise, it will be triggered when connection becomes ready
  if (isConnected && !hasIntroduced) {
    hasIntroduced = true;
    console.log('🎬 Starting agent introduction (connection already ready)...');
    setTimeout(() => introducer(), 500); // Small delay to let UI settle
  }
});

// ⛔️ Removed 'viz.ctx' suspended check

// --- Updated Scenario Data with 8 Chapters per Scenario ---

     const scenarioData = {
            medical: {
                id: 'medical',
                title: 'Scenario 1: Life Sciences',
                subtitle: '',
                icon: '🧬',
                iconBg: 'green',
                workflow: [
                    { icon: '🧪', title: 'Lab Analysis', center: false },
                    { icon: '📋', title: 'Trial Protocol', subtitle: 'Central Research Hub', center: true },
                    { icon: '📊', title: 'Data Files', center: false }
                ],
                workflowRow2: [
                    { icon: '🔬', title: 'Molecular Structure', center: false },
                    { icon: '📝', title: 'Research Notes', center: false }
                ],
                questions: [
                    { icon: '', color: '', text: 'What is reasoning?' },
                    { icon: '', color: '', text: 'What kind of drug is this example about?' },
                    { icon: '', color: '', text: 'Why do Phase 3 trials take so long to prepare?' },
                    { icon: '', color: '', text: 'How does Alqamist know what to focus on first?' }
                ],
                chapters: [ // Array of 8 chapters
                    // Chapter 1
                    {
                        number: 1,
                        total: 8,
                        title: 'Understands <span class="highlight">Complex Work</span>',
                        subtitle: 'Watch how Alqamist processes and analyzes complex life sciences data through intelligent reasoning and structured understanding',
                        questions: [
                            { icon: 'ℹ️', color: 'blue', text: 'What data does it process first?' },
                            { icon: '🔍', color: 'green', text: 'Can it detect missing or irrelevant information?' },
                            { icon: '📊', color: 'orange', text: "What's the output of this step?" },
                            { icon: '🗺️', color: 'red', text: 'Show me the reasoning map.' }
                        ],
                        nextChapterDesc: 'Continue your journey to discover how Alqamist transforms life sciences research',
                        continueBtn: 'Continue with Chapter 1',
                        question:'How does Alqamist understand complex work in Life Sciences.'
                    },
                    // Chapter 2
                    {
                        number: 2,
                        total: 8,
                        title: ' Think Like an Expert',
                        subtitle: 'Explore how Alqamist rapidly synthesizes disparate data sources for faster insights.',
                        questions: [
                            { icon: '🧪', color: 'blue', text: 'How does it merge lab results with trial data?' },
                            { icon: '💡', color: 'green', text: 'What is the most critical data point right now?' },
                            { icon: '📝', color: 'orange', text: 'Summarize the research notes.' },
                            { icon: '🔍', color: 'red', text: 'Can it forecast potential trial deviations?' }
                        ],
                        nextChapterDesc: 'Chapter 3: Focuses on regulatory compliance and documentation.',
                        continueBtn: 'Continue with Chapter 2',
                        question:'How does Alqamist think like a medical writer?'
                    },
                    // Chapter 3
                    {
                        number: 3,
                        total: 8,
                        title: 'Picks the Best Tools Automatically',
                        subtitle: 'A deep dive into how Alqamist applies regulatory rules to the research protocol.',
                        questions: [
                            { icon: '📋', color: 'blue', text: 'Which regulations apply to this trial phase?' },
                            { icon: '🔍', color: 'green', text: 'Identify any protocol violations.' },
                            { icon: '📝', color: 'orange', text: 'What needs to be added to the consent form?' },
                            { icon: '🚨', color: 'red', text: 'Show me all high-risk compliance items.' }
                        ],
                        nextChapterDesc: 'Chapter 4: Discovering complex molecular interactions.',
                        continueBtn: 'Continue with Chapter 3',
                        question:'How does Alqamist choose the right AI tools for Life Sciences?'
                    },
                    // Chapter 4
                    {
                        number: 4,
                        total: 8,
                        title: 'Plans Ahead and Adapts',
                        subtitle: 'Visualizing and understanding the drug\'s molecular mechanism of action.',
                        questions: [
                            { icon: '🔬', color: 'blue', text: 'Explain the drug\'s primary target mechanism.' },
                            { icon: '🧪', color: 'green', text: 'What are the predicted off-target effects?' },
                            { icon: '📈', color: 'orange', text: 'How does the model predict efficacy?' },
                            { icon: '🧬', color: 'red', text: 'Compare this structure to similar compounds.' }
                        ],
                        nextChapterDesc: 'Chapter 5: Translating research into formal medical documents.',
                        continueBtn: 'Continue with Chapter 4',
                             question:'How does Alqamist adapt during a clinical trial design?'
                    },
                    // Chapter 5
                    {
                        number: 5,
                        total: 8,
                        title: 'Works Like a Team',
                        subtitle: 'How Alqamist assists in creating accurate and detailed medical writing.',
                        questions: [
                            { icon: '📝', color: 'blue', text: 'Draft a section of the Investigator’s Brochure.' },
                            { icon: '💡', color: 'green', text: 'What is the consensus conclusion on safety?' },
                            { icon: '📊', color: 'orange', text: 'Generate a summary of adverse events.' },
                            { icon: '✒️', color: 'red', text: 'What are the required citation standards?' }
                        ],
                        nextChapterDesc: 'Chapter 6: Analyzing patient safety and pharmacovigilance.',
                        continueBtn: 'Continue with Chapter 5',
                              question:'How does Alqamist collaborate like a research team?'
                    },
                    // Chapter 6
                    {
                        number: 6,
                        total: 8,
                        title: 'Explains its Thinking',
                        subtitle: 'Monitoring and assessing drug safety profiles during clinical development.',
                        questions: [
                            { icon: '💊', color: 'blue', text: 'Identify all Serious Adverse Events (SAEs).' },
                            { icon: '🚨', color: 'green', text: 'Is there a new safety signal detected?' },
                            { icon: '📑', color: 'orange', text: 'What are the mandatory reporting timelines?' },
                            { icon: '🔍', color: 'red', text: 'Analyze the causality assessment report.' }
                        ],
                        nextChapterDesc: 'Chapter 7: Preparing for the final submission phase.',
                        continueBtn: 'Continue with Chapter 6',
                                      question:'How does Alqamist explain its reasoning?'
                    },
                    // Chapter 7
                    {
                        number: 7,
                        total: 8,
                        title: 'Learns and Improves',
                        subtitle: 'Structuring the immense amount of data for NDA/BLA submission.',
                        questions: [
                            { icon: '📂', color: 'blue', text: 'List the required modules for the eCTD.' },
                            { icon: '📈', color: 'green', text: 'Check the completeness of the statistical analysis.' },
                            { icon: '📝', color: 'orange', text: 'Generate the Executive Summary.' },
                            { icon: '✅', color: 'red', text: 'Verify all documents are version controlled.' }
                        ],
                        nextChapterDesc: 'Chapter 8: The future of intelligent life sciences research.',
                        continueBtn: 'Continue with Chapter 7',
                                          question:'How does Alqamist learn from feedback in Life Sciences?'
                    },
                    // Chapter 8 (Final Chapter)
                    {
                        number: 8,
                        total: 8,
                        title: 'Plug and Play',
                        subtitle: 'Looking ahead at how AI will continue to revolutionize drug development.',
                        questions: [
                            { icon: '🔮', color: 'blue', text: 'What is the next big thing in AI for trials?' },
                            { icon: '💡', color: 'green', text: 'Suggest a novel approach for patient recruitment.' },
                            { icon: '🌐', color: 'orange', text: 'How can this be scaled globally?' },
                            { icon: '🚀', color: 'red', text: 'What are the key takeaways from this journey?' }
                        ],
                        nextChapterDesc: 'You have completed the Life Sciences journey. Click below to return to the home screen.',
                        continueBtn: 'Return to Scenarios',
                        question:'How does Alqamist connect with real research systems?'
                    }
                ],
                // Start with chapter index 0 for the first chapter on the scenario screen
                initialChapterIndex: 0
            },
            manufacturing: {
                id: 'manufacturing',
                title: 'Scenario 2: Manufacturing',
                subtitle: 'Production Optimization',
                icon: '🏭',
                iconBg: 'orange',
                workflow: [
                    { icon: '📦', title: 'Supply Chain', center: false },
                    { icon: '⚙️', title: 'Production Line', subtitle: 'Central Hub', center: true },
                    { icon: '📈', title: 'Quality Metrics', center: false }
                ],
                workflowRow2: [
                    { icon: '🔧', title: 'Equipment Data', center: false },
                    { icon: '📊', title: 'Analytics', center: false }
                ],
                questions: [
                    { icon: 'ℹ️', color: 'blue', text: 'How does predictive maintenance work?' },
                    { icon: '💡', color: 'green', text: 'What efficiency gains are possible?' },
                    { icon: '⚡', color: 'orange', text: 'How fast can it detect anomalies?' },
                    { icon: '🔍', color: 'red', text: 'Show me the optimization process.' }
                ],
                chapters: [
                    // Chapter 1
                    {
                        number: 1,
                        total: 8,
                        title: 'Optimizes <span class="highlight">Production Flow</span>',
                        subtitle: 'Discover how Alqamist analyzes manufacturing data to improve efficiency and reduce downtime',
                        questions: [
                            { icon: 'ℹ️', color: 'blue', text: 'What bottlenecks does it identify?' },
                            { icon: '🔍', color: 'green', text: 'How does it prioritize issues?' },
                            { icon: '📊', color: 'orange', text: 'What are the key metrics tracked?' },
                            { icon: '🗺️', color: 'red', text: 'Show the production flow map.' }
                        ],
                        nextChapterDesc: 'Chapter 2: Analyzing the complex dynamics of the supply chain.',
                        continueBtn: 'Continue with Chapter 1'
                    },
                    // Chapter 2
                    {
                        number: 2,
                        total: 8,
                        title: 'Predicts <span class="highlight">Supply Chain Delays</span>',
                        subtitle: 'Using real-time data to forecast and mitigate material shortages and logistic issues.',
                        questions: [
                            { icon: '📦', color: 'blue', text: 'Which component is at highest risk of shortage?' },
                            { icon: '🚚', color: 'green', text: 'Optimize the inbound logistics route.' },
                            { icon: '💰', color: 'orange', text: 'Calculate the cost impact of a 5-day delay.' },
                            { icon: '💡', color: 'red', text: 'Suggest an alternative supplier for part X.' }
                        ],
                        nextChapterDesc: 'Chapter 3: Deep dive into equipment health and predictive maintenance.',
                        continueBtn: 'Continue with Chapter 2'
                    },
                     // Chapter 3
                    {
                        number: 3,
                        total: 8,
                        title: 'Enables <span class="highlight">Predictive Maintenance</span>',
                        subtitle: 'Monitoring equipment data to predict failures before they happen and reduce unplanned downtime.',
                        questions: [
                            { icon: '🔧', color: 'blue', text: 'Which machine has the highest failure probability this week?' },
                            { icon: '⚙️', color: 'green', text: 'What is the optimal time for the next scheduled stop?' },
                            { icon: '🌡️', color: 'orange', text: 'Analyze the vibration and temperature data.' },
                            { icon: '🚨', color: 'red', text: 'Generate an alert for bearing B-47.' }
                        ],
                        nextChapterDesc: 'Chapter 4: Maintaining and improving product quality assurance.',
                        continueBtn: 'Continue with Chapter 3'
                    },
                    // Chapter 4
                    {
                        number: 4,
                        total: 8,
                        title: 'Enhancing <span class="highlight">Quality Assurance</span>',
                        subtitle: 'Automated analysis of quality metrics to identify sources of defects and improve yield.',
                        questions: [
                            { icon: '📈', color: 'blue', text: 'What is the current defect rate and its trend?' },
                            { icon: '🔍', color: 'green', text: 'Identify the root cause of the last batch rejection.' },
                            { icon: '📊', color: 'orange', text: 'What process parameter correlates most with quality score?' },
                            { icon: '✅', color: 'red', text: 'Suggest a process adjustment to improve yield.' }
                        ],
                        nextChapterDesc: 'Chapter 5: Optimizing energy consumption and reducing waste.',
                        continueBtn: 'Continue with Chapter 4'
                    },
                    // Chapter 5
                    {
                        number: 5,
                        total: 8,
                        title: 'Driving <span class="highlight">Sustainability</span>',
                        subtitle: 'Identifying opportunities to reduce energy usage, water consumption, and material waste on the production line.',
                        questions: [
                            { icon: '⚡', color: 'blue', text: 'Which step consumes the most energy?' },
                            { icon: '♻️', color: 'green', text: 'How can we reduce material waste by 10%?' },
                            { icon: '💰', color: 'orange', text: 'Calculate the ROI of a new energy-saving measure.' },
                            { icon: '🌐', color: 'red', text: 'Benchmark our sustainability metrics against industry leaders.' }
                        ],
                        nextChapterDesc: 'Chapter 6: Human factors and worker safety on the floor.',
                        continueBtn: 'Continue with Chapter 5'
                    },
                    // Chapter 6
                    {
                        number: 6,
                        total: 8,
                        title: 'Improving <span class="highlight">Worker Safety</span>',
                        subtitle: 'Using operational data and sensor information to proactively flag safety risks.',
                        questions: [
                            { icon: '👷', color: 'blue', text: 'Where have the most near-miss incidents occurred?' },
                            { icon: '🚨', color: 'green', text: 'Analyze the safety protocol for machine M-12.' },
                            { icon: '📝', color: 'orange', text: 'Draft a safety training summary for new hires.' },
                            { icon: '💡', color: 'red', text: 'Suggest a redesign to eliminate a common hazard.' }
                        ],
                        nextChapterDesc: 'Chapter 7: Scaling up the optimized production model.',
                        continueBtn: 'Continue with Chapter 6'
                    },
                    // Chapter 7
                    {
                        number: 7,
                        total: 8,
                        title: 'Scaling <span class="highlight">Global Operations</span>',
                        subtitle: 'Applying lessons learned to new facilities and managing multi-site optimization.',
                        questions: [
                            { icon: '🗺️', color: 'blue', text: 'What is the best site to implement the new process first?' },
                            { icon: '⚙️', color: 'green', text: 'Compare the efficiency of Plant A vs Plant B.' },
                            { icon: '📈', color: 'orange', text: 'Forecast capacity after full rollout.' },
                            { icon: '🌐', color: 'red', text: 'Identify cultural or regulatory barriers to scaling.' }
                        ],
                        nextChapterDesc: 'Chapter 8: The future of autonomous and intelligent manufacturing.',
                        continueBtn: 'Continue with Chapter 7'
                    },
                    // Chapter 8 (Final Chapter)
                    {
                        number: 8,
                        total: 8,
                        title: 'The <span class="highlight">Autonomous Factory</span>',
                        subtitle: 'Exploring the path toward a fully self-optimizing and intelligent manufacturing environment.',
                        questions: [
                            { icon: '🤖', color: 'blue', text: 'What level of automation is currently achievable?' },
                            { icon: '💡', color: 'green', text: 'Describe a closed-loop optimization system.' },
                            { icon: '🔮', color: 'orange', text: 'What are the main challenges to full autonomy?' },
                            { icon: '🚀', color: 'red', text: 'What are the key takeaways from this journey?' }
                        ],
                        nextChapterDesc: 'You have completed the Manufacturing journey. Click below to return to the home screen.',
                        continueBtn: 'Return to Scenarios'
                    }
                ],
                initialChapterIndex: 0
            },
            finance: {
                id: 'finance',
                title: 'Scenario 3: Pension & Insurance',
                subtitle: 'Risk Assessment and Planning',
                icon: '🛡️',
                iconBg: 'blue',
                workflow: [
                    { icon: '📑', title: 'Policy Documents', center: false },
                    { icon: '💼', title: 'Risk Analysis', subtitle: 'Central Hub', center: true },
                    { icon: '📊', title: 'Financial Data', center: false }
                ],
                workflowRow2: [
                    { icon: '📈', title: 'Market Trends', center: false },
                    { icon: '🔐', title: 'Compliance', center: false }
                ],
                questions: [
                    { icon: 'ℹ️', color: 'blue', text: 'How does risk assessment work?' },
                    { icon: '💡', color: 'green', text: 'What compliance checks are performed?' },
                    { icon: '💰', color: 'orange', text: 'How are premiums calculated?' },
                    { icon: '🔍', color: 'red', text: 'Show the risk evaluation process.' }
                ],
                chapters: [
                    // Chapter 1
                    {
                        number: 1,
                        total: 8,
                        title: 'Analyzes <span class="highlight">Risk Factors</span>',
                        subtitle: 'See how Alqamist evaluates complex financial and actuarial data for better decision making',
                        questions: [
                            { icon: 'ℹ️', color: 'blue', text: 'What risk factors are considered?' },
                            { icon: '🔍', color: 'green', text: 'How accurate are the predictions?' },
                            { icon: '📊', color: 'orange', text: 'What data sources are used?' },
                            { icon: '🗺️', color: 'red', text: 'Show the risk assessment map.' }
                        ],
                        nextChapterDesc: 'Chapter 2: Focuses on regulatory compliance and policy review.',
                        continueBtn: 'Continue with Chapter 1'
                    },
                    // Chapter 2
                    {
                        number: 2,
                        total: 8,
                        title: 'Ensuring <span class="highlight">Compliance & Policy Review</span>',
                        subtitle: 'Rapidly reviewing complex policy documents against dynamic regulatory requirements.',
                        questions: [
                            { icon: '🔐', color: 'blue', text: 'Identify all GDPR/CCPA violations in the policy data.' },
                            { icon: '📑', color: 'green', text: 'Does this policy comply with Solvency II capital requirements?' },
                            { icon: '📝', color: 'orange', text: 'Summarize the key exclusions in policy ID-490.' },
                            { icon: '🚨', color: 'red', text: 'Flag all policies due for a mandatory legal update.' }
                        ],
                        nextChapterDesc: 'Chapter 3: Deep analysis of market fluctuations and investment risk.',
                        continueBtn: 'Continue with Chapter 2'
                    },
                    // Chapter 3
                    {
                        number: 3,
                        total: 8,
                        title: 'Modeling <span class="highlight">Market Volatility</span>',
                        subtitle: 'Forecasting the impact of global market trends on pension and investment portfolios.',
                        questions: [
                            { icon: '📈', color: 'blue', text: 'How does a 10% interest rate hike affect the portfolio?' },
                            { icon: '💰', color: 'green', text: 'What is the Value at Risk (VaR) for this quarter?' },
                            { icon: '🌐', color: 'orange', text: 'Analyze the risk from emerging market exposure.' },
                            { icon: '💡', color: 'red', text: 'Suggest a hedge strategy against currency risk.' }
                        ],
                        nextChapterDesc: 'Chapter 4: Calculating accurate premiums and pricing models.',
                        continueBtn: 'Continue with Chapter 3'
                    },
                    // Chapter 4
                    {
                        number: 4,
                        total: 8,
                        title: 'Optimizing <span class="highlight">Premium Pricing</span>',
                        subtitle: 'Using granular data and AI models to set competitive and profitable insurance premiums.',
                        questions: [
                            { icon: '💸', color: 'blue', text: 'Calculate the net premium for a 50-year-old non-smoker.' },
                            { icon: '📊', color: 'green', text: 'Identify a segment with inaccurately priced risk.' },
                            { icon: '🔍', color: 'orange', text: 'Which demographic factor most influences premium cost?' },
                            { icon: '📉', color: 'red', text: 'What is the expected loss ratio for the next year?' }
                        ],
                        nextChapterDesc: 'Chapter 5: Managing the complexity of catastrophic events.',
                        continueBtn: 'Continue with Chapter 4'
                    },
                    // Chapter 5
                    {
                        number: 5,
                        total: 8,
                        title: 'Assessing <span class="highlight">Catastrophe Risk</span>',
                        subtitle: 'Modeling and planning for the financial impact of low-frequency, high-severity events.',
                        questions: [
                            { icon: '🌪️', color: 'blue', text: 'What is the exposure to a Category 5 hurricane event?' },
                            { icon: '🚨', color: 'green', text: 'Analyze the financial reserve adequacy for a pandemic.' },
                            { icon: '🗺️', color: 'orange', text: 'Show the geographical distribution of high-risk properties.' },
                            { icon: '📑', color: 'red', text: 'Review the reinsurance treaty terms for a major event.' }
                        ],
                        nextChapterDesc: 'Chapter 6: Personalizing financial advice and pension planning.',
                        continueBtn: 'Continue with Chapter 5'
                    },
                    // Chapter 6
                    {
                        number: 6,
                        total: 8,
                        title: 'Personalized <span class="highlight">Pension Planning</span>',
                        subtitle: 'Providing tailored retirement advice based on individual financial data and risk tolerance.',
                        questions: [
                            { icon: '👴', color: 'blue', text: 'Calculate the necessary contribution for a comfortable retirement.' },
                            { icon: '📈', color: 'green', text: 'Model the impact of a 2% lower return rate on retirement age.' },
                            { icon: '💡', color: 'orange', text: 'Suggest a risk adjustment for the next 5 years.' },
                            { icon: '💰', color: 'red', text: 'Analyze the liquidity risk in the current portfolio.' }
                        ],
                        nextChapterDesc: 'Chapter 7: Combating financial crime and fraud detection.',
                        continueBtn: 'Continue with Chapter 6'
                    },
                    // Chapter 7
                    {
                        number: 7,
                        total: 8,
                        title: 'Detecting <span class="highlight">Financial Crime</span>',
                        subtitle: 'Using AI to identify suspicious transactions and flag potential money laundering or fraud schemes.',
                        questions: [
                            { icon: '🔍', color: 'blue', text: 'What are the top 3 anti-money laundering (AML) red flags?' },
                            { icon: '🚨', color: 'green', text: 'Analyze transaction history for potential fraud patterns.' },
                            { icon: '🔐', color: 'orange', text: 'How does the system ensure false positives are low?' },
                            { icon: '📝', color: 'red', text: 'Draft a Suspicious Activity Report (SAR) template.' }
                        ],
                        nextChapterDesc: 'Chapter 8: The final vision for AI in finance and insurance.',
                        continueBtn: 'Continue with Chapter 7'
                    },
                    // Chapter 8 (Final Chapter)
                    {
                        number: 8,
                        total: 8,
                        title: 'The <span class="highlight">Intelligent Advisor</span>',
                        subtitle: 'The role of AI in moving from reactive risk assessment to proactive financial guidance.',
                        questions: [
                            { icon: '🔮', color: 'blue', text: 'What are the regulatory hurdles for fully autonomous advising?' },
                            { icon: '💡', color: 'green', text: 'Describe a next-generation insurance product.' },
                            { icon: '🌐', color: 'orange', text: 'How will AI change the role of the human actuary?' },
                            { icon: '🚀', color: 'red', text: 'What are the key takeaways from this journey?' }
                        ],
                        nextChapterDesc: 'You have completed the Finance journey. Click below to return to the home screen.',
                        continueBtn: 'Return to Scenarios'
                    }
                ],
                initialChapterIndex: 0
            }
        };

        const domains = [
            { id: 'medical', icon: '👨‍⚕️', color: 'green', title: 'Medical Writing and Research' }
        ];

        let currentScreen = 1;
        let currentScenario = null;
        let currentChapterIndex = 0; // New state variable to track current chapter

        // Initialize
        function init() {
            renderDomains();
            setupEventListeners();
        }

        function renderDomains() {
            const container = document.getElementById('domainCards');
            // We changed the structure: A wrapper (.domain-item) holds the icon and the text-card separately
            container.innerHTML = domains.map(domain => `
                <div class="domain-item" data-domain="${domain.id}">
                    <div class="domain-icon ${domain.color}">${domain.icon}</div>
                    <div class="domain-text-card">
                        <h3>${domain.title}</h3>
                    </div>
                </div>
            `).join('');
        }

        async function renderScenario(scenarioId) {
            const data = scenarioData[scenarioId];
            currentScenario = scenarioId;
            currentChapterIndex = 0; // Reset to Chapter 1 when a new scenario is selected
            console.log(scenarioId)
            
            // INTERRUPT AGENT IMMEDIATELY when navigating to new scenario
            if (isConnected && isAgentSpeaking && currentVideoId) {
                try {
                    await interruptAgent();
                    console.log('🛑 Agent interrupted for scenario navigation');
                } catch (error) {
                    console.error('❌ Failed to interrupt:', error);
                }
            }
            
            if(scenarioId == 'medical')
            {
               await AskQuestion('Introduce Life Sciences')
            }
            if(scenarioId == 'manufacturing')
              {
              // await AskQuestion('Give brief about manufacturing')
            }
              if(scenarioId == 'finance'){
              // await AskQuestion('Give brief about finance')
            }
            // Scenario Header
            document.getElementById('scenarioHeader').innerHTML = `
                <div class="scenario-icon">${data.icon}</div>
                <div>
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
            `;

            // === MODIFICATION START ===
            // Combine both workflow arrays into one
            const allWorkflowItems = [...data.workflow, ...data.workflowRow2];

            // Workflow
            document.getElementById('workflowContainer').innerHTML = `
                <div class="workflow">
                    ${allWorkflowItems.map(item => `
                        <div class="workflow-card ${item.center ? 'center' : ''}">
                            <div class="workflow-icon">${item.icon}</div>
                            <h4>${item.title}</h4>
                            ${item.subtitle ? `<p>${item.subtitle}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
            // === MODIFICATION END ===

            // Questions
            document.getElementById('questionGrid').innerHTML = data.questions.map(q => `
                <div class="question-card">
                    <div class="question-icon ${q.color}">${q.icon}</div>
                    <p>${q.text}</p>
                </div>
            `).join('');

            // Update button text for Chapter 1
            const chapter1Data = data.chapters[0];
            document.getElementById('chapterBtnText').textContent = `Start Chapter ${chapter1Data.number} – ${chapter1Data.title.replace(/<[^>]*>/g, '')}`;
              
          }

        function renderChapter(scenarioId, chapterIndex) {
            const chapterData = scenarioData[scenarioId].chapters[chapterIndex];

            document.getElementById('chapterBadgeText').textContent = `Chapter ${chapterData.number} of ${chapterData.total}`;
            document.getElementById('chapterTitle').innerHTML = chapterData.title;
            document.getElementById('chapterSubtitle').innerHTML = chapterData.subtitle;
            document.getElementById('nextChapterDesc').textContent = chapterData.nextChapterDesc;
            document.getElementById('continueBtnText').textContent = chapterData.continueBtn;

            document.getElementById('chapterQuestionGrid').innerHTML = chapterData.questions.map(q => `
                <div class="question-card">
                    <div class="question-icon ${q.color}">${q.icon}</div>
                    <p>${q.text}</p>
                </div>
            `).join('');
        }
        
        async function navigateToNextChapter() {
            if (!currentScenario) return;

            const totalChapters = scenarioData[currentScenario].chapters.length;

            if (currentChapterIndex < totalChapters - 1) {

              console.log(">>>>>>>", scenarioData[currentScenario].chapters[currentChapterIndex].question)
    
                // INTERRUPT AGENT IMMEDIATELY before moving to next chapter
                if (isConnected && isAgentSpeaking && currentVideoId) {
                    try {
                        await interruptAgent();
                        console.log('🛑 Agent interrupted for chapter navigation');
                    } catch (error) {
                        console.error('❌ Failed to interrupt:', error);
                    }
                }
    
                // Move to the next chapter
                currentChapterIndex++;
                renderChapter(currentScenario, currentChapterIndex);
                          await AskQuestion(scenarioData[currentScenario].chapters[currentChapterIndex].question)
                navigateTo(3); // Stay on the chapter screen
            } else {
                // Completed all chapters, go back to home screen (Screen 1)
                alert(`Scenario "${scenarioData[currentScenario].title}" completed! Returning to home.`);
                navigateTo(1);
            }
        }

        function navigateTo(screenNum) {
           document.querySelectorAll('.screen').forEach(s => {
                s.classList.remove('active');
                s.style.opacity = '0'; // Ensure hidden screens are transparent
            });

            const activeScreen = document.getElementById(`screen${screenNum}`);
            activeScreen.classList.add('active');
            
            // Slight delay to allow 'display: block' to apply before fading in
            // This ensures the element is in the DOM before the browser tries to draw the blur
            requestAnimationFrame(() => {
                activeScreen.style.opacity = '1';
            });
            currentScreen = screenNum;
            
            const backBtn = document.getElementById('backBtn');
            // Back button visible for screens 2 (Scenario) and 3 (Chapter)
            backBtn.classList.toggle('visible', screenNum > 1);

            // Return to live video when going back to home screen
            if (screenNum === 1 && isPresetVideoPlaying) {
                returnToLiveVideo();
            }

            document.querySelector('.content-section').scrollTo({ top: 0, behavior: 'smooth' });
        }

        // ⛔️ Removed 'startViz' and 'stopViz' functions

        function setupEventListeners() {
            // Domain cards
            document.getElementById('domainCards').addEventListener('click', async (e) => {
                // CHANGED: Look for .domain-item instead of .domain-card
                const card = e.target.closest('.domain-item'); 
                
                if (card) {
                    const domainId = card.dataset.domain;
                    
                    // Trigger preset video if available for this scenario
                    if (presetVideos[domainId]) {
                        console.log(`🎬 Playing preset video for ${domainId}`);
                        // await playPresetVideo(presetVideos[domainId]);
                    }
                    
                    await renderScenario(domainId);
                    navigateTo(2);
                }
            });

            // Back button
            document.getElementById('backBtn').addEventListener('click', () => {
                if (currentScreen === 3) {
                    // From Chapter (Screen 3) go back to Scenario (Screen 2)
                    navigateTo(2);
                } else if (currentScreen === 2) {
                    // From Scenario (Screen 2) go back to Home (Screen 1)
                    navigateTo(1);
                }
            });

            // Start chapter button
            document.getElementById('startChapterBtn').addEventListener('click', async () => {
                if (currentScenario) {
                     // AskQuestion(scenarioData[currentScenario].chapters[0].question)
                    renderChapter(currentScenario, currentChapterIndex);
                    navigateTo(3);
                    await AskQuestion(scenarioData[currentScenario].chapters[0].question);
                }
            });

            // Continue button
            document.getElementById('continueBtn').addEventListener('click', async () => {
                await navigateToNextChapter();
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'Escape') {
                    if (currentScreen === 3) {
                        navigateTo(2);
                    } else if (currentScreen === 2) {
                        navigateTo(1);
                    }
                }
            });
        }

        init();



// ============================================
// DOM ELEMENTS
// ============================================
const appContainer = document.getElementById('app-container');
const liveVideo = document.getElementById('liveVideo');
const presetVideo = document.getElementById('presetVideo');
const statusToast = document.getElementById('status-toast');
const statusText = statusToast.querySelector('.status-text');
const connectionStatus = document.getElementById('connection-status');

const chromaCanvas = document.getElementById('chromaCanvas');
const avatarWrapper = document.getElementById('avatarWrapper');

let chromaStarted = false;

// ============================================
// SIMPLE GREEN-SCREEN CHROMA KEY
// ============================================
function startChromaKey() {
  if (!chromaCanvas || !liveVideo || !avatarWrapper) return;

  const ctx = chromaCanvas.getContext('2d');
  
  // ⛔️ REMOVED: The `edgeTrimRatio` logic. We will draw the full frame.

  // Match internal canvas resolution to the avatar wrapper
  function resizeCanvas() {
    const rect = avatarWrapper.getBoundingClientRect();
    chromaCanvas.width = rect.width;
    chromaCanvas.height = rect.height;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const keyR = 0;
  const keyG = 255;
  const keyB = 0;

  const hardCutoff = 105;
  const softEdge = 45;
  const greenDominance = 1.18;

  function render() {
    if (
      liveVideo.readyState >= 2 &&
      chromaCanvas.width > 0 &&
      chromaCanvas.height > 0
    ) {
      
      // ===================================================================
      // ✨ FIX: Use the 'simple' drawing method to prevent scaling/cropping
      // ===================================================================
      ctx.drawImage(liveVideo, 0, 0, chromaCanvas.width, chromaCanvas.height);
      // ⛔️ REMOVED: All the `trimX`, `trimY`, `sourceWidth`, `sourceHeight`
      // and the 9-argument `ctx.drawImage` call.
      // ===================================================================

      const frame = ctx.getImageData(0, 0, chromaCanvas.width, chromaCanvas.height);
      const data = frame.data;
      const width = chromaCanvas.width;
      const height = chromaCanvas.height;
      const pixelCount = (data.length / 4) | 0;
      const alphaCopy = new Uint8ClampedArray(pixelCount);

      // (All the advanced pixel processing from the 'improved' function remains below)

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const dr = r - keyR;
        const dg = g - keyG;
        const db = b - keyB;
        const distSq = dr * dr + dg * dg + db * db;

        const isGreenish =
          g > 80 && g > r * greenDominance && g > b * greenDominance;

        if (isGreenish) {
          const dist = Math.sqrt(distSq);
          if (dist < hardCutoff) {
            data[i + 3] = 0;
          } else if (dist < hardCutoff + softEdge) {
            const blend = (dist - hardCutoff) / softEdge;
            data[i + 3] = Math.min(data[i + 3], Math.max(0, data[i + 3] * blend));
          }

          // Despill: pull excessive green towards averaged red/blue to avoid halo
          const rbAverage = (r + b) / 2;
          data[i + 1] = Math.min(rbAverage * 1.05, rbAverage * 0.85 + data[i + 1] * 0.15);
        }

        alphaCopy[i / 4] = data[i + 3];
      }

      // Feather jagged edges by applying a separable 5-tap Gaussian blur to transitional alpha values
      const kernel = [1, 4, 6, 4, 1];
      const kernelSum = kernel.reduce((acc, v) => acc + v, 0);
      const tempAlpha = new Float32Array(pixelCount);
      const blurredAlpha = new Float32Array(pixelCount);

      for (let y = 0; y < height; y++) {
        const rowIndex = y * width;
        for (let x = 0; x < width; x++) {
          const idx = rowIndex + x;
          const alpha = alphaCopy[idx];
          if (alpha === 0 || alpha === 255) {
            tempAlpha[idx] = alpha;
            continue;
          }

          let sum = 0;
          for (let k = -2; k <= 2; k++) {
            const sampleX = Math.min(width - 1, Math.max(0, x + k));
            sum += alphaCopy[rowIndex + sampleX] * kernel[k + 2];
          }

          tempAlpha[idx] = sum / kernelSum;
        }
      }

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const idx = y * width + x;
          const alpha = tempAlpha[idx];
          if (alpha === 0 || alpha === 255) {
            blurredAlpha[idx] = alpha;
            continue;
          }

          let sum = 0;
          for (let k = -2; k <= 2; k++) {
            const sampleY = Math.min(height - 1, Math.max(0, y + k));
            sum += tempAlpha[sampleY * width + x] * kernel[k + 2];
          }

          blurredAlpha[idx] = sum / kernelSum;
        }
      }

      for (let idx = 0; idx < pixelCount; idx++) {
        const originalAlpha = alphaCopy[idx];
        if (originalAlpha === 0 || originalAlpha === 255) {
          continue;
        }

        const smoothAlpha = Math.max(0, Math.min(255, blurredAlpha[idx]));
        const dataIndex = idx * 4;
        data[dataIndex + 3] = Math.round(originalAlpha * 0.25 + smoothAlpha * 0.75);

        // Lightly blend RGB to reduce harsh edges on semi-transparent pixels
        const blendFactor = data[dataIndex + 3] / 255;
        if (blendFactor > 0 && blendFactor < 1) {
          const avg = (data[dataIndex] + data[dataIndex + 1] + data[dataIndex + 2]) / 3;
          data[dataIndex] = Math.round(data[dataIndex] * blendFactor + avg * (1 - blendFactor));
          data[dataIndex + 1] = Math.round(data[dataIndex + 1] * blendFactor + avg * (1 - blendFactor));
          data[dataIndex + 2] = Math.round(data[dataIndex + 2] * blendFactor + avg * (1 - blendFactor));
        }
      }

      ctx.putImageData(frame, 0, 0);
    }

    requestAnimationFrame(render);
  }

  // Hide the raw video element visually
  liveVideo.classList.add('chroma-hidden');
  requestAnimationFrame(render);
}

// ⛔️ Removed 'initVizDom' function call

// Initialize video states - liveVideo starts shown, presetVideo starts hidden
liveVideo.classList.add('shown');
liveVideo.classList.remove('hidden');
presetVideo.classList.add('hidden');
presetVideo.classList.remove('shown');

 //const textInput = document.getElementById('text-input');
const voiceBtn = document.getElementById('voice-btn');
//const sendBtn = document.getElementById('send-btn');
const agentSpeaking = document.getElementById('agent-speaking');
// const interruptBtn = document.getElementById('interrupt-btn');
// const historyToggle = document.getElementById('history-toggle');
// const chatHistory = document.getElementById('chat-history');
// const closeHistory = document.getElementById('close-history');
// const messagesContainer = document.getElementById('messages-container');
const suggestionCards = document.querySelectorAll('.suggestion-card');

// ============================================
// STATE MANAGEMENT (Raw API)
// ============================================
// WebRTC State
let peerConnection = null;
let streamId = null;
let sessionId = null;
let chatId = null;
let dataChannel = null; // Direct access! No monkey-patch needed
let isFluent = false;
let isStreamReady = false;
let isStreamPlaying = false;

// UI State
let isConnected = false;
let isAgentSpeaking = false;
let recognition = null;
let isRecording = false;
let inputtextvalue = ""
let currentVideoId = null;
let hasIntroduced = false; // Track if introduction has been played
let hasInitialGreeting = false; // NEW: Track if initial short greeting has been given
let isWaitingForUserResponse = false; // NEW: Track if we're waiting for user's first response
let isWaitingForStreamEndToIntroduce = false; // NEW: Flag to trigger intro after stream ends
let micEnabled = true; // NEW: Track if mic is enabled
let speakingTimeout = null; // NEW: For smooth transitions

// ============================================
// MICROPHONE UI STATE MANAGEMENT - NEW
// ============================================
function updateMicButtonState(state) {
  const voiceButtons = document.querySelectorAll('#voice-btn, #voice-btn-home');
  const statusTexts = document.querySelectorAll('.mic-status-text');
  
  voiceButtons.forEach(btn => {
    // Remove all state classes
    btn.classList.remove('recording', 'disabled');
    
    // Add appropriate class
    if (state === 'recording') {
      btn.classList.add('recording');
    } else if (state === 'disabled') {
      btn.classList.add('disabled');
    }
  });
  
  // Update status text
  statusTexts.forEach(text => {
    text.classList.remove('recording', 'disabled');
    
    if (state === 'recording') {
      text.textContent = '🎤 Listening...';
      text.classList.add('recording');
    } else if (state === 'disabled') {
      // text.textContent = 'AI is speaking...';
      text.classList.add('disabled');
    } else {
      text.textContent = 'Hold to speak';
    }
  });
}


// ============================================
// API HELPER FUNCTIONS
// ============================================
async function fetchWithRetry(url, options, retries = 3) {
  try {
    const res = await fetch(url, options);
    if (!res.ok && retries > 0) {
      console.warn('Fetch failed, retrying...', url);
      await new Promise((r) => setTimeout(r, (Math.random() + 1) * 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    return res;
  } catch (err) {
    if (retries > 0) {
      console.warn('Fetch error, retrying...', url);
      await new Promise((r) => setTimeout(r, (Math.random() + 1) * 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  }
}

function stopStream() {
  const stream = liveVideo.srcObject;
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    liveVideo.srcObject = null;
  }
}

function closeConnection() {
  if (!peerConnection) return;
  try { peerConnection.close(); } catch { }
  peerConnection = null;
  isStreamReady = false;
  isStreamPlaying = false;
  // ⛔️ Removed stopViz() call
}

// ============================================

function showLive() {
  liveVideo.classList.add('shown');  liveVideo.classList.remove('hidden');
  presetVideo.classList.add('hidden'); presetVideo.classList.remove('shown');
  // Don't reassign srcObject — you keep the live stream warm. :contentReference[oaicite:5]{index=5}
}

function showPreset() {
  presetVideo.classList.add('shown'); presetVideo.classList.remove('hidden');
  liveVideo.classList.add('hidden');  liveVideo.classList.remove('shown');
}

function stopPreset() {
  // Cleanly stop & release the file so next play starts at 0
  try { presetVideo.pause(); } catch(e){}
  presetVideo.removeAttribute('src');
  presetVideo.load();
  showLive();
}

async function playPresetChapterVideo(path) {
  // Make sure agent isn’t speaking & UI doesn’t flicker while the file plays
  // (We keep the connection alive; just hide the live stream.)
  showPreset();

  // Resolve path & compat with your original filename if you didn’t rename it
  const candidates = [
    path,
    '/assets/life_scenario.mp4',
    '/assets/Life%20Senario.mp4', // original name with space
    'life_scenario.mp4',
    'Life%20Senario.mp4'
  ];

  // Pick first that works (best-effort without fetch)
  presetVideo.src = candidates[0];
  presetVideo.currentTime = 0;
  presetVideo.muted = false; // play with sound
  await presetVideo.play().catch(console.warn);

  // When the clip ends, fade back to live bot
  presetVideo.onended = () => {
    stopPreset();
  };
}

function showStatus(message) {
  statusText.textContent = message;
  statusToast.classList.add('show');
}

function hideStatus() {
  statusToast.classList.remove('show');
}

function updateConnectionStatus(status, isLive = true) {
  connectionStatus.textContent = status;
  const dot = document.querySelector('.pulse-dot');
  if (isLive) {
    dot.style.background = '#10b981';
  } else {
    dot.style.background = '#ef4444';
  }
}

function addMessage(content, role) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  
  const messageText = document.createElement('div');
  messageText.className = 'message-text';
  messageText.textContent = content;
  
  messageDiv.appendChild(messageText);
  // messagesContainer.appendChild(messageDiv);
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


function showAgentSpeaking() {
  // Clear any pending hide timeout
  if (speakingTimeout) {
    clearTimeout(speakingTimeout);
    speakingTimeout = null;
  }
  
  isAgentSpeaking = true;
  micEnabled = false;
  
  // Update mic button to disabled state
  updateMicButtonState('disabled');
  
  // Show agent speaking indicator - including home screen
  const agentSpeakingDivs = document.querySelectorAll('#agent-speaking, #agent-speaking-home');
  agentSpeakingDivs.forEach(div => {
    div.style.display = 'flex';
  });
}

function hideAgentSpeaking() {
  // Add a small delay before hiding to prevent flicker
  if (speakingTimeout) {
    clearTimeout(speakingTimeout);
  }
  
  speakingTimeout = setTimeout(() => {
    isAgentSpeaking = false;
    micEnabled = true;
    
    // Update mic button to idle state
    updateMicButtonState('idle');
    
    // Hide agent speaking indicator - including home screen
    const agentSpeakingDivs = document.querySelectorAll('#agent-speaking, #agent-speaking-home');
    agentSpeakingDivs.forEach(div => {
      div.style.display = 'none';
    });
    
    speakingTimeout = null;
  }, 300); // 300ms delay prevents flicker
}

// SPEECH RECOGNITION SETUP
// ============================================
function initSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported');
     voiceBtn.style.display = 'none';
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

    recognition.onstart = () => {
      isRecording = true;
      updateMicButtonState('recording'); // NEW: Update visual state
      inputtextvalue = 'Listening...';
    };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    //textInput.value = transcript;
    inputtextvalue = transcript
    sendMessage(transcript);
  };

  recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isRecording = false;
      updateMicButtonState('idle'); // NEW: Update visual state
      inputtextvalue = 'Type your message or use voice...';
    };

  recognition.onend = () => {
      isRecording = false;
      if (!isAgentSpeaking) {
        updateMicButtonState('idle'); // NEW: Update visual state
      }
      inputtextvalue = 'Type your message or use voice...';
    };
}

// ============================================
// RAW STREAMS API - AGENT INITIALIZATION
// ============================================
async function initializeAgent() {
  try {
    console.log('🚀 Connecting to Agent using Raw Streams API...');
    showStatus('Connecting to agent...');
    updateConnectionStatus('Connecting...', false);
    
    // Clean up any existing connections
    stopStream();
    closeConnection();

    // ========================================
    // STEP 1: Fetch Agent Info
    // ========================================
    console.log('📋 Fetching agent info...');
    const resAgent = await fetch(`${DID_API.url}/agents/${agentId}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Basic ${DID_API.key}`,
        'Content-Type': 'application/json' 
      }
    });
    
    if (!resAgent.ok) {
      throw new Error(`Failed to fetch agent: ${resAgent.status} ${resAgent.statusText}`);
    }
    
    const agentData = await resAgent.json();
    console.log('✅ Agent loaded:', agentData.preview_name);

    // ========================================
    // STEP 2: Create Chat Session
    // ========================================
    console.log('💬 Creating chat session...');
    const resChat = await fetch(`${DID_API.url}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: { 
        'Authorization': `Basic ${DID_API.key}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ persist: true })
    });
    
    if (!resChat.ok) {
      throw new Error(`Failed to create chat: ${resChat.status}`);
    }
    
    const chatData = await resChat.json();
    chatId = chatData.id;
    console.log('✅ Chat session created:', chatId);

    // ========================================
    // STEP 3: Create Stream Session
    // ========================================
    console.log('🎥 Creating stream session...');
    const streamOptions = { 
      compatibility_mode: 'on', 
      fluent: true  // Enable fluent for Premium+ agents
    };
    
    const resStream = await fetchWithRetry(
      `${DID_API.url}/agents/${agentId}/streams`,
      {
        method: 'POST',
        headers: { 
          'Authorization': `Basic ${DID_API.key}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(streamOptions)
      }
    );
    
    if (!resStream.ok) {
      throw new Error(`Failed to create stream: ${resStream.status}`);
    }
    
    const streamData = await resStream.json();
    console.log('📊 Stream response data:', JSON.stringify(streamData, null, 2));
    streamId = streamData.id;
    sessionId = streamData.session_id;
    isFluent = !!streamData.fluent;
    
    console.log('✅ Stream created:', streamId);
    console.log('✅ Session ID:', sessionId);
    console.log('✅ Fluent mode:', isFluent);
    
    if (!isFluent) {
      console.warn('⚠️ Not in Fluent mode. Interruption requires Premium+ agent.');
    }

    // ========================================
    // STEP 4: Set Up WebRTC Peer Connection
    // ========================================
    console.log('🔌 Setting up WebRTC connection...');
    
    const RTCPeerConnectionCtor = 
      window.RTCPeerConnection || 
      window.webkitRTCPeerConnection || 
      window.mozRTCPeerConnection;
    
    peerConnection = new RTCPeerConnectionCtor({ 
      iceServers: streamData.ice_servers 
    });

    // ========================================
    // ICE Candidate Handler
    // ========================================
    peerConnection.addEventListener('icecandidate', (event) => {
      const body = event.candidate
        ? { 
            candidate: event.candidate.candidate, 
            sdpMid: event.candidate.sdpMid, 
            sdpMLineIndex: event.candidate.sdpMLineIndex 
          }
        : {};
      
      fetch(`${DID_API.url}/agents/${agentId}/streams/${streamId}/ice`, {
        method: 'POST',
        headers: { 
          'Authorization': `Basic ${DID_API.key}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ session_id: sessionId, ...body })
      });
      
      console.log('🧊 ICE candidate sent');
    });

    // ========================================
    // Connection State Handler
    // ========================================
    peerConnection.addEventListener('connectionstatechange', () => {
      console.log('🔌 Connection state:', peerConnection.connectionState);
      
      switch(peerConnection.connectionState) {
        case 'connecting':
          updateConnectionStatus('', false);
          break;
          
        case 'connected':
          setTimeout(() => {
            if (!isStreamReady) isStreamReady = true;
            isConnected = true;
            updateConnectionStatus('', true);
            hideStatus();
            
            // Show app with fade-in
            const appContainer = document.getElementById('app-container');
            if (appContainer) {
              appContainer.classList.add('loaded');
            }
            
            console.log('✅ Agent connected and ready!');
            
            // Call introducer if user has entered main experience and haven't introduced yet
            const continuepage = document.getElementById('continuepage');
            if (continuepage && continuepage.style.display === 'none' && !hasIntroduced) {
              hasIntroduced = true;
              console.log('🎬 Starting agent introduction...');
              introducer();
            }
          }, 300);
          break;
          
        case 'disconnected':
        case 'closed':
          updateConnectionStatus('', false);
          isConnected = false;
          currentVideoId = null;
          showStatus('Connection lost. Refresh to reconnect.');
          break;
          
        case 'failed':
          stopStream();
          closeConnection();
          break;
      }
    });

    // ⛔️ Removed 3D Visualizer functions

    // ========================================
    // Track Handler (Video/Audio Stream)
    // ========================================
    peerConnection.addEventListener('track', (event) => {
      console.log('📺 Remote track received');
      const stream = event.streams[0];
      const [track] = stream.getVideoTracks();
      if (!track) return;

      // Set video source
      liveVideo.srcObject = stream;

      // ⛔️ Removed visualizer setup block
      
      liveVideo.muted = false;
      liveVideo.classList.add('shown');
      presetVideo.classList.add('hidden');
      
      // Set flag when video starts
      if (!isVideoStreamReady) {
        isVideoStreamReady = true;
        console.log('✅ Video stream is now ready');
      }

        // 🔵 NEW: start chroma key once, when the first video track arrives
      if (!chromaStarted) {
        chromaStarted = true;
        console.log('🎨 Starting chroma key on green screen');
        startChromaKey();
      }

      // Monitor playback state
      let lastBytes = 0;
      const interval = setInterval(async () => {
        if (!peerConnection || peerConnection.connectionState === 'closed') {
          clearInterval(interval);
          return;
        }
        
        try {
          const receiver = peerConnection.getReceivers().find((r) => r.track === track);
          if (!receiver) return;
          
          const stats = await receiver.getStats();
          stats.forEach((report) => {
            if (report.type === 'inbound-rtp' && report.kind === 'video') {
              const nowPlaying = report.bytesReceived > lastBytes;
              if (nowPlaying !== isStreamPlaying) {
                isStreamPlaying = nowPlaying;
                console.log('🎬 Stream playing state:', isStreamPlaying);
              }
              lastBytes = report.bytesReceived;
            }
          });
        } catch (e) {
          // Ignore stats errors
        }
      }, 400);
    });

    // ========================================
    // Data Channel (CRITICAL FOR INTERRUPTION!)
    // ========================================
    dataChannel = peerConnection.createDataChannel('JanusDataChannel');
    console.log('📡 Data channel created');
    
    dataChannel.onopen = () => {
      console.log('🔓 Data channel opened!');
    };
    
    dataChannel.onclose = () => {
      console.log('🔒 Data channel closed');
      dataChannel = null;
    };
    
    dataChannel.onmessage = (event) => {
      let msg = event.data;
      console.log('📨 Data channel message:', msg);
      
      // Chat answers
      if (msg.includes('chat/answer')) {
        msg = decodeURIComponent(msg.replace('chat/answer:', ''));
        console.log('💬 Agent:', msg);
      }
      
      // Track when agent starts speaking (for interruption!)
      if (msg.includes('stream/started')) {
        if (isFluent) {
          try {
            const match = msg.match(/{.*}/);
            if (match) {
              const data = JSON.parse(match[0]);
              currentVideoId = data.metadata?.videoId;
              console.log('📹 Video started, ID:', currentVideoId);
              showAgentSpeaking();
            }
          } catch (error) {
            console.error('Failed to parse stream/started:', error);
          }
        }
      }
      
      // Reset when agent finishes speaking
      if (msg.includes('stream/done')) {
        console.log('📹 Video done, clearing ID');
        currentVideoId = null;
        hideAgentSpeaking();

        // NEW: Check if we need to trigger the full introduction now
        if (isWaitingForStreamEndToIntroduce) {
          console.log('🎬 Stream done, triggering full introduction now...');
          isWaitingForStreamEndToIntroduce = false; // Reset flag
          sendFullIntroduction(); // Call the intro function
        }
      }
    };

    // ========================================
    // STEP 5: Exchange SDP (WebRTC Handshake)
    // ========================================
    await peerConnection.setRemoteDescription(streamData.offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    console.log('📤 Sending local SDP answer...');
    const resSdp = await fetch(
      `${DID_API.url}/agents/${agentId}/streams/${streamId}/sdp`,
      {
        method: 'POST',
        headers: { 
          'Authorization': `Basic ${DID_API.key}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          answer: answer,
          session_id: sessionId
        })
      }
    );
    
    if (!resSdp.ok) {
      throw new Error(`Failed to send SDP answer: ${resSdp.status}`);
    }
    
    console.log('✅ SDP exchange complete');

    // Mark agent as loaded
    isAgentLoaded = true;
    console.log('✅✅✅ Agent initialization complete!');

  } catch (error) {
    console.error('❌ Failed to initialize agent:', error);
    
    let errorMessage = 'Failed to connect to agent. ';
    if (error.message.includes('fetch')) {
      errorMessage += 'Network error - check your internet connection.';
    } else if (error.message.includes('401') || error.message.includes('403')) {
      errorMessage += 'Authentication failed - check your API key.';
    } else {
      errorMessage += error.message;
    }
    
    showStatus(errorMessage);
    updateConnectionStatus('Error', false);
    
    // Re-enable button so user can retry
    if (continueButton) {
      continueButton.disabled = false;
      continueButton.textContent = 'Retry Connection';
    }
  }
}


// ============================================
// MESSAGE HANDLING (Raw API)
// ============================================
async function sendMessage(message) {
  if (!isConnected || !chatId || !streamId) {
    console.warn('⚠️ Cannot send message - not connected');
    return;
  }
  
  try {
    console.log('💬 Sending message:', message);
    
    // Try with both possible formats
    const requestBody = {
      streamId: streamId,
      sessionId: sessionId,
      messages: [{
        role: 'user',
        content: message,
        created_at: new Date().toISOString()
      }]
    };
    
    console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(
      `${DID_API.url}/agents/${agentId}/chat/${chatId}`,
      {
        method: 'POST',
        headers: { 
          'Authorization': `Basic ${DID_API.key}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requestBody)
      }
    );
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ API Error Response:', errorData);
      throw new Error(`Chat failed: ${response.status} ${response.statusText} - ${errorData}`);
    }
    
    const responseData = await response.json();
    console.log('✅ Message sent successfully:', responseData);
    
    // NEW: If this is the user's first response after initial greeting, trigger full introduction
    if (isWaitingForUserResponse && !message.startsWith("Say:") && !message.startsWith("Please introduce")) {
      console.log('🎯 User responded! Setting flag to trigger full introduction after this reply.');
      isWaitingForUserResponse = false; // Prevent this from firing again
      isWaitingForStreamEndToIntroduce = true; // Flag for the dataChannel handler
    }
    
  } catch (error) {
    console.error('❌ Failed to send message:', error);
    showStatus('Failed to send message. Please try again.');
  }
}

// Introducer function to trigger initial agent greeting
async function introducer() {
  if (!isConnected || !chatId || !streamId) {
    console.warn('⚠️ Cannot introduce - not connected yet');
    return;
  }
  
  console.log('👋 Triggering agent introduction...');
  
  // Send short initial greeting instead of full introduction
  await sendMessage("Say: Hi there and welcome to The Alqamist – your Interactive Reasoning Partner. How are you today?");
  hasInitialGreeting = true;
  isWaitingForUserResponse = true;
}

// NEW: Full introduction function to be called after user responds
async function sendFullIntroduction() {
  if (!isConnected || !chatId || !streamId) {
    console.warn('⚠️ Cannot send full introduction - not connected yet');
    return;
  }
  
  console.log('🎬 Sending full introduction...');
  
  // Send full introduction prompt
  // await sendMessage("Please introduce yourself and welcome me to Alqamist with your full introduction.");
  isWaitingForUserResponse = false;
}

async function AskQuestion(question) {
  if (!isConnected) return;
  
  // Interrupt if agent is speaking
  if (isAgentSpeaking && currentVideoId) {
    try {
      await interruptAgent();
      console.log('🛑 Agent interrupted before asking new question');
    } catch (error) {
      console.error('❌ Failed to interrupt:', error);
    }
  }
  
  // Send the question
  await sendMessage(question);
}

/**
 * Interrupt agent using data channel (MUCH SIMPLER NOW!)
 */
async function interruptAgent() {
  if (!currentVideoId) {
    console.warn('⚠️ No currentVideoId available for interruption');
    return;
  }
  
  if (!dataChannel) {
    console.error('❌ Data channel not available');
    return;
  }
  
  if (dataChannel.readyState !== 'open') {
    console.error('❌ Data channel is not open. State:', dataChannel.readyState);
    return;
  }
  
  try {
    // ✅ Direct and simple! No monkey-patch needed!
    const interruptMessage = JSON.stringify({
      type: 'stream/interrupt',
      videoId: currentVideoId,
      timestamp: Date.now()
    });
    
    dataChannel.send(interruptMessage);
    console.log('✅ Interrupt message sent:', interruptMessage);
    
    // Clear the video ID
    currentVideoId = null;
    hideAgentSpeaking();
    
  } catch (error) {
    console.error('❌ Failed to send interrupt:', error);
  }
}


// Send button
// sendBtn.addEventListener('click', () => {
//   const message = inputtextvalue.trim();
//   if (message) {
//     sendMessage(message);
//   }
// });

// Enter key to send
// textInput.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     const message = textInput.value.trim();
//     if (message) {
//       sendMessage(message);
    
//     }
//   }
// });

// ============================================
// VOICE BUTTON - ENHANCED INTERACTION
// ============================================
function handleVoiceStart(e) {
  e.preventDefault();
  
  // Don't start if agent is speaking or mic is disabled
  if (isAgentSpeaking || !micEnabled || !recognition) {
    return;
  }

  if (!isRecording) {
    try {
      recognition.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
    }
  }
}

function handleVoiceEnd(e) {
  e.preventDefault();
  
  if (recognition && isRecording) {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }
}

// Voice button - ALL instances (there might be multiple on different screens)
const voiceButtons = document.querySelectorAll('#voice-btn, #voice-btn-home');
voiceButtons.forEach(btn => {
  // Desktop events
  btn.addEventListener('mousedown', handleVoiceStart);
  btn.addEventListener('mouseup', handleVoiceEnd);
  btn.addEventListener('mouseleave', handleVoiceEnd);
  
  // Mobile events
  btn.addEventListener('touchstart', handleVoiceStart);
  btn.addEventListener('touchend', handleVoiceEnd);
});

// Interrupt buttons - for all screens including home
const interruptButtons = document.querySelectorAll('#interrupt-btn, #interrupt-btn-home');
interruptButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    if (!isConnected || !isAgentSpeaking) return;
    
    try {
      await interruptAgent();
      console.log('🛑 Agent interrupted');
    } catch (error) {
      console.error('❌ Failed to interrupt:', error);
    }
  });
});
// Interrupt button
// interruptBtn.addEventListener('click', async () => {
//   if (!isConnected || !isAgentSpeaking) return;
  
//   try {
//     await agentManager.interrupt({ type: 'click' });
//     console.log('🛑 Agent interrupted');
  // } catch (error) {
//     console.error('❌ Failed to interrupt:', error);
//   }
// });

// Suggestion cards
// suggestionCards.forEach(card => {
//   card.addEventListener('click', async () => {
//     if (!isConnected) return;
    
//     const prompt = card.dataset.prompt;
//     if (!prompt) return;

//     card.classList.add('loading');
    
//     try {
//       await agentManager.chat("introduce yourself as The Alqamist");
//       addMessage(prompt, 'user');
//     } catch (error) {
//       console.error('❌ Failed to send suggestion:', error);
//     } finally {
//       setTimeout(() => {
//         card.classList.remove('loading');
//       }, 1000);
//     }
//   });
// });

// Chat history toggle
// historyToggle.addEventListener('click', () => {
//   chatHistory.classList.add('open');
// });

// closeHistory.addEventListener('click', () => {
//   // chatHistory.classList.remove('open');
// });

// Close history when clicking outside
document.addEventListener('click', (e) => {
  // if (chatHistory.classList.contains('open') && 
  //     !chatHistory.contains(e.target) && 
  //     !historyToggle.contains(e.target)) {
  //   chatHistory.classList.remove('open');
  // }
});

// ============================================
// SERVICE WORKER CLEANUP
// ============================================
async function unregisterServiceWorkers() {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
        console.log('🧹 Unregistered service worker');
      }
    } catch (error) {
      console.warn('Could not unregister service workers:', error);
    }
  }
}

// ============================================
// SETUP MICROPHONE UI
// ============================================
function setupMicrophoneUI() {
  const voiceControls = document.querySelectorAll('.voice-controls');
  
  voiceControls.forEach(control => {
    // Check if status text already exists
    if (!control.querySelector('.mic-status-text')) {
      const statusText = document.createElement('div');
      statusText.className = 'mic-status-text';
      statusText.textContent = 'Hold to speak';
      control.appendChild(statusText);
    }
  });
  
  console.log('✅ Microphone UI setup complete (including home screen)');
}

// ============================================
// INITIALIZATION
// ============================================
(async function init() {
  console.log('🚀 Initializing Live Agent Demo...');
  
  // CRITICAL: Remove any service workers from old implementation
  await unregisterServiceWorkers();
  
  // Initialize speech recognition
  initSpeechRecognition();

  // NEW: Setup microphone UI status text
  setupMicrophoneUI();
  
  // DON'T initialize agent here - wait for continue button click
  // This prevents the agent from auto-talking on page load
  console.log('✅ Ready - click Continue to connect to agent');
})();