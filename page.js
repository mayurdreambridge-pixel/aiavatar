import './style.css';
import { createAgentManager, StreamType } from '@d-id/client-sdk';
        const auth = { 
  type: 'key', 
  clientKey: "YXV0aDB8NjhmZjNmMDEyODZjNmUzNjgzMTdlZDg0OnFFVjNoSkk0NUt1SEJ2VVlFX1lWdg==" // Get this from D-ID Studio
};
let isStartIntroIsDone = false;
const agentId = "v2_agt_3CYryUYK"; // Your Premium+ Agent ID

// --- Updated Scenario Data with 8 Chapters per Scenario ---

     const scenarioData = {
            medical: {
                id: 'medical',
                title: 'Scenario 1: Life Sciences',
                subtitle: 'Medical Writing and Research',
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
                    { icon: 'ℹ️', color: 'blue', text: 'Why do Phase 3 trials take so long to prepare?' },
                    { icon: '💡', color: 'green', text: 'What is reasoning?' },
                    { icon: '💊', color: 'orange', text: 'What kind of drug is this example about?' },
                    { icon: '🔍', color: 'red', text: 'How does Alqamist know what to focus on first?' }
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
                        title: 'Accelerates <span class="highlight">Data Synthesis</span>',
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
                        title: 'Ensures <span class="highlight">Regulatory Compliance</span>',
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
                        title: 'Modeling <span class="highlight">Molecular Interactions</span>',
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
                        title: 'Drafting <span class="highlight">Medical Documents</span>',
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
                        title: 'Optimizing <span class="highlight">Pharmacovigilance</span>',
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
                        title: 'Preparing <span class="highlight">Final Submission</span>',
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
                        title: 'The Future of <span class="highlight">Intelligent Research</span>',
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
            { id: 'medical', icon: '👨‍⚕️', color: 'green', title: 'Medical Writing<br>and Research' },
            { id: 'manufacturing', icon: '🏭', color: 'orange', title: 'Manufacturing' },
            { id: 'finance', icon: '🛡️', color: 'blue', title: 'Pension and<br>Insurance' }
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
            container.innerHTML = domains.map(domain => `
                <div class="domain-card" data-domain="${domain.id}">
                    <div class="domain-icon ${domain.color}">${domain.icon}</div>
                    <h3>${domain.title}</h3>
                </div>
            `).join('');
        }

        function renderScenario(scenarioId) {
            const data = scenarioData[scenarioId];
            currentScenario = scenarioId;
            currentChapterIndex = 0; // Reset to Chapter 1 when a new scenario is selected

            // Scenario Header
            document.getElementById('scenarioHeader').innerHTML = `
                <div class="scenario-icon">${data.icon}</div>
                <div>
                    <h2>${data.title}</h2>
                    <p>${data.subtitle}</p>
                </div>
            `;

            // Workflow
            document.getElementById('workflowContainer').innerHTML = `
                <div class="workflow">
                    ${data.workflow.map(item => `
                        <div class="workflow-card ${item.center ? 'center' : ''}">
                            <div class="workflow-icon">${item.icon}</div>
                            <h4>${item.title}</h4>
                            ${item.subtitle ? `<p>${item.subtitle}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="workflow" style="margin-top: -30px;">
                    ${data.workflowRow2.map(item => `
                        <div class="workflow-card">
                            <div class="workflow-icon">${item.icon}</div>
                            <h4>${item.title}</h4>
                        </div>
                    `).join('')}
                </div>
            `;

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
        
        function navigateToNextChapter() {
            if (!currentScenario) return;

            const totalChapters = scenarioData[currentScenario].chapters.length;

            if (currentChapterIndex < totalChapters - 1) {

              console.log(">>>>>>>", scenarioData[currentScenario].chapters[currentChapterIndex].question)
              AskQuestion(scenarioData[currentScenario].chapters[currentChapterIndex].question)
                // Move to the next chapter
                currentChapterIndex++;
                renderChapter(currentScenario, currentChapterIndex);
                navigateTo(3); // Stay on the chapter screen
            } else {
                // Completed all chapters, go back to home screen (Screen 1)
                alert(`Scenario "${scenarioData[currentScenario].title}" completed! Returning to home.`);
                navigateTo(1);
            }
        }

        function navigateTo(screenNum) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(`screen${screenNum}`).classList.add('active');
            currentScreen = screenNum;
            
            const backBtn = document.getElementById('backBtn');
            // Back button visible for screens 2 (Scenario) and 3 (Chapter)
            backBtn.classList.toggle('visible', screenNum > 1);

            document.querySelector('.content-section').scrollTo({ top: 0, behavior: 'smooth' });
        }

        function setupEventListeners() {
            // Domain cards
            document.getElementById('domainCards').addEventListener('click', (e) => {
                const card = e.target.closest('.domain-card');
                if (card) {
                    const domainId = card.dataset.domain;
                    renderScenario(domainId);
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
            document.getElementById('startChapterBtn').addEventListener('click', () => {
                if (currentScenario) {
                    currentChapterIndex = 0; // Always start at Chapter 1 when clicking "Start Chapter"
                    renderChapter(currentScenario, currentChapterIndex);
                    navigateTo(3);
                }
            });

            // Continue button
            document.getElementById('continueBtn').addEventListener('click', () => {
                navigateToNextChapter();
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
const statusToast = document.getElementById('status-toast');
const statusText = statusToast.querySelector('.status-text');
const connectionStatus = document.getElementById('connection-status');
// const textInput = document.getElementById('text-input');
// const voiceBtn = document.getElementById('voice-btn');
// const sendBtn = document.getElementById('send-btn');
// const agentSpeaking = document.getElementById('agent-speaking');
// const interruptBtn = document.getElementById('interrupt-btn');
// const historyToggle = document.getElementById('history-toggle');
// const chatHistory = document.getElementById('chat-history');
// const closeHistory = document.getElementById('close-history');
// const messagesContainer = document.getElementById('messages-container');
const suggestionCards = document.querySelectorAll('.suggestion-card');

// ============================================
// STATE MANAGEMENT
// ============================================
let agentManager = null;
let isConnected = false;
let isAgentSpeaking = false;
let recognition = null;
let isRecording = false;

// ============================================
// UTILITY FUNCTIONS
// ============================================
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
  // agentSpeaking.style.display = 'flex';
  isAgentSpeaking = true;
}

function hideAgentSpeaking() {
  // agentSpeaking.style.display = 'none';
  isAgentSpeaking = false;
  isVideoInitialized= false;
}

// ============================================
// SPEECH RECOGNITION SETUP
// ============================================
function initSpeechRecognition() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported');
    // voiceBtn.style.display = 'none';
    return;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isRecording = true;
    // voiceBtn.classList.add('recording');
    //textInput.placeholder = 'Listening...';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    //textInput.value = transcript;
    //sendMessage(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isRecording = false;
    // voiceBtn.classList.remove('recording');
    //textInput.placeholder = 'Type your message or use voice...';
  };

  recognition.onend = () => {
    isRecording = false;
    // voiceBtn.classList.remove('recording');
   // textInput.placeholder = 'Type your message or use voice...';
  };
}

// ============================================
// AGENT SDK CALLBACKS
// ============================================
let isVideoInitialized = false;

const callbacks = {
  onSrcObjectReady(srcObject) {
    console.log('✅ Video stream ready');
    
    if (!isVideoInitialized) {
      liveVideo.srcObject = srcObject;
      liveVideo.muted = false;
      isVideoInitialized = true;
    }
    
    return srcObject;
  },

  // Connection state changes
  onConnectionStateChange(state) {
    console.log('🔌 Connection state:', state);
    
    switch(state) {
      case 'connecting':
        showStatus('Connecting to agent...');
        updateConnectionStatus('Connecting...', false);
        break;
        
      case 'connected':
        hideStatus();
        updateConnectionStatus('Live', true);
        isConnected = true;
        
        // Show the app with smooth fade-in
        setTimeout(() => {
          appContainer.classList.add('loaded');
        }, 300);
        
        console.log('✅ Agent connected and ready!');
        break;
        
      case 'disconnected':
      case 'closed':
        updateConnectionStatus('Disconnected', false);
        isConnected = false;
        showStatus('Connection lost. Refresh to reconnect.');
        break;
    }
  },

  // Video state changes (Fluent streaming)
  onVideoStateChange(state) {
    console.log('🎥 Video state:', state);
    
    // In Fluent mode, the video is always playing
    // Just handle the visual feedback
    if (state === 'START') {
      showAgentSpeaking();
    } else if (state === 'STOP') {
      hideAgentSpeaking();
    }
  },

  // Agent activity state (TALKING/IDLE)
  onAgentActivityStateChange(state) {
    console.log('🗣️ Agent activity:', state);
    
    if (state === 'TALKING') {
      showAgentSpeaking();
    } else {
      hideAgentSpeaking();
    }
  },

  // New messages
  onNewMessage(messages, type) {
    console.log('💬 New message:', messages, type);
    
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    if (lastMessage.role === 'assistant' && type === 'answer') {
      addMessage(lastMessage.content, 'agent');
    }
  },

  // Error handling
  onError(error, errorData) {
    console.error('❌ Error:', error, errorData);
    showStatus('Something went wrong. Please try again.');
    updateConnectionStatus('Error', false);
  }
};

// ============================================
// AGENT MANAGER SETUP
// ============================================
async function initializeAgent() {
  try {
    // Validate credentials
    if (!auth.clientKey || auth.clientKey === 'YOUR_CLIENT_KEY_HERE') {
      const message = '⚠️ Missing Client Key!\n\nPlease add your Client Key in main.js:\n1. Go to D-ID Studio\n2. Click your agent → Embed\n3. Copy data-client-key value\n4. Paste in main.js line 11';
      alert(message);
      console.error(message);
      return;
    }
    
    if (!agentId || agentId === 'YOUR_AGENT_ID_HERE') {
      const message = '⚠️ Missing Agent ID!\n\nPlease add your Agent ID in main.js:\n1. Go to D-ID Studio\n2. Click your agent → Embed\n3. Copy data-agent-id value\n4. Paste in main.js line 13';
      alert(message);
      console.error(message);
      return;
    }

    console.log('📋 Credentials validated');
    console.log('🔑 Client Key:', auth.clientKey.substring(0, 20) + '...');
    console.log('🤖 Agent ID:', agentId);

    showStatus('Initializing agent...');

    // Stream options for seamless Fluent streaming
    const streamOptions = {
      compatibilityMode: 'on',
      streamWarmup: true,
      fluent: true  // CRITICAL: Enables seamless single-stream video
    };

    console.log('📦 Creating agent manager...');

    // Create agent manager
    agentManager = await createAgentManager(agentId, {
      auth,
      callbacks,
      streamOptions
    });

    console.log('✅ Agent Manager created:', agentManager);

    // Connect to agent
    showStatus('Connecting to agent...');
    console.log('🔌 Connecting to agent...');
    
    await agentManager.connect();

    const streamType = agentManager.getStreamType();
    console.log('📡 Stream Type:', streamType);

    if (streamType !== StreamType.Fluent) {
      console.warn('⚠️ Not using Fluent streaming. Premium+ agent required for best experience.');
      showStatus('Connected (using legacy mode - upgrade to Premium+ for Fluent)');
    }

    setTimeout(() => {
    //introducer()
    }, 5000);

  } catch (error) {
    console.error('❌ Failed to initialize agent:', error);
    
    // Provide specific error messages
    let errorMessage = 'Failed to connect. ';
    
    if (error.message.includes('CORS') || error.message.includes('Failed to fetch')) {
      errorMessage += 'Network error - please check:\n\n';
      errorMessage += '1. Your credentials are correct\n';
      errorMessage += '2. Your agent exists in D-ID Studio\n';
      errorMessage += '3. Try refreshing the page\n';
      errorMessage += '4. Check browser console for details';
    } else if (error.message.includes('401') || error.message.includes('403')) {
      errorMessage += 'Authentication failed - check your Client Key';
    } else if (error.message.includes('404')) {
      errorMessage += 'Agent not found - check your Agent ID';
    } else {
      errorMessage += error.message;
    }
    
    showStatus(errorMessage);
    alert(errorMessage);
  }
}

async function introducer() {
  if(!isStartIntroIsDone)
  {
    isStartIntroIsDone = true;
  if (!isConnected) return;
    try {
      await agentManager.chat("introduce yourself as The Alqmist");
    } catch (error) {
      console.error('❌ Failed to send suggestion:', error);
    } finally {
    
    }
  }
}

// ============================================
// MESSAGE HANDLING
// ============================================
async function sendMessage(message) {
  if (!isConnected || !message.trim()) return;

  try {
    addMessage(message, 'user');
    //textInput.value = '';
    // sendBtn.disabled = true;

    // Send chat message to agent
    await agentManager.chat(message);
    
    setTimeout(() => {
      // sendBtn.disabled = false;
    }, 500);

  } catch (error) {
    console.error('❌ Failed to send message:', error);
    // sendBtn.disabled = false;
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Send button
// sendBtn.addEventListener('click', () => {
//   const message = textInput.value.trim();
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

// Voice button
// voiceBtn.addEventListener('click', () => {
//   if (!recognition) return;
  
//   if (isRecording) {
//     recognition.stop();
//   } else {
//     recognition.start();
//   }
// });

// Interrupt button
// interruptBtn.addEventListener('click', async () => {
//   if (!isConnected || !isAgentSpeaking) return;
  
//   try {
//     await agentManager.interrupt({ type: 'click' });
//     console.log('🛑 Agent interrupted');
//   } catch (error) {
//     console.error('❌ Failed to interrupt:', error);
//   }
// });

// Suggestion cards
suggestionCards.forEach(card => {
  card.addEventListener('click', async () => {
    if (!isConnected) return;
    
    const prompt = card.dataset.prompt;
    if (!prompt) return;

    card.classList.add('loading');
    
    try {
      await agentManager.chat("introduce yourself as The Alqmist");
      addMessage(prompt, 'user');
    } catch (error) {
      console.error('❌ Failed to send suggestion:', error);
    } finally {
      setTimeout(() => {
        card.classList.remove('loading');
      }, 1000);
    }
  });
});

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
// INITIALIZATION
// ============================================
(async function init() {
  console.log('🚀 Initializing Live Agent Demo...');
  
  // CRITICAL: Remove any service workers from old implementation
  await unregisterServiceWorkers();
  
  // Initialize speech recognition
  initSpeechRecognition();
  
  // Initialize agent
  await initializeAgent();
})();



async function AskQuestion(question) {
  if (!isConnected) return;
    try {
      await agentManager.chat(question);
    } catch (error) {
      console.error('❌ Failed to send suggestion:', error);
    } finally {
    
    }
}