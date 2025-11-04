import './style.css';
import { createAgentManager, StreamType } from '@d-id/client-sdk';
        const auth = { 
  type: 'key', 
  clientKey: "YXV0aDB8NjhmZjNmMDEyODZjNmUzNjgzMTdlZDg0OnFFVjNoSkk0NUt1SEJ2VVlFX1lWdg==" // Get this from D-ID Studio
};

const agentId = "v2_agt_3CYryUYK"; // Your Premium+ Agent ID



'use strict';
const fetchJsonFile = await fetch('./api.json');
const DID_API = await fetchJsonFile.json();
if (DID_API.key == '🤫') alert('Please put your api key inside ./api.json and restart..');


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
                chapter: {
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
                    continueBtn: 'Continue with the Life Sciences Journey'
                }
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
                chapter: {
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
                    nextChapterDesc: 'Continue learning how Alqamist transforms manufacturing operations',
                    continueBtn: 'Continue with the Manufacturing Journey'
                }
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
                chapter: {
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
                    nextChapterDesc: 'Continue exploring how Alqamist enhances financial planning',
                    continueBtn: 'Continue with the Finance Journey'
                }
            }
        };

        const domains = [
            { id: 'medical', icon: '👨‍⚕️', color: 'green', title: 'Medical Writing<br>and Research' },
            { id: 'manufacturing', icon: '🏭', color: 'orange', title: 'Manufacturing' },
            { id: 'finance', icon: '🛡️', color: 'blue', title: 'Pension and<br>Insurance' }
        ];

        let currentScreen = 1;
        let currentScenario = null;

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

            document.getElementById('chapterBtnText').textContent = `Start Chapter 1 – ${data.chapter.title.replace(/<[^>]*>/g, '')}`;
        }

        function renderChapter(scenarioId) {
            const data = scenarioData[scenarioId].chapter;

            document.getElementById('chapterBadgeText').textContent = `Chapter ${data.number} of ${data.total}`;
            document.getElementById('chapterTitle').innerHTML = data.title;
            document.getElementById('chapterSubtitle').innerHTML = data.subtitle;
            document.getElementById('nextChapterDesc').textContent = data.nextChapterDesc;
            document.getElementById('continueBtnText').textContent = data.continueBtn;

            document.getElementById('chapterQuestionGrid').innerHTML = data.questions.map(q => `
                <div class="question-card">
                    <div class="question-icon ${q.color}">${q.icon}</div>
                    <p>${q.text}</p>
                </div>
            `).join('');
        }

        function navigateTo(screenNum) {
            document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
            document.getElementById(`screen${screenNum}`).classList.add('active');
            currentScreen = screenNum;
            
            const backBtn = document.getElementById('backBtn');
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
                if (currentScreen > 1) navigateTo(currentScreen - 1);
            });

            // Start chapter button
            document.getElementById('startChapterBtn').addEventListener('click', () => {
                if (currentScenario) {
                    renderChapter(currentScenario);
                    navigateTo(3);
                }
            });

            // Continue button
            document.getElementById('continueBtn').addEventListener('click', () => {
                alert('Next chapter would load here!');
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft' || e.key === 'Escape') {
                    if (currentScreen > 1) navigateTo(currentScreen - 1);
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
const textInput = document.getElementById('text-input');
const voiceBtn = document.getElementById('voice-btn');
const sendBtn = document.getElementById('send-btn');
const agentSpeaking = document.getElementById('agent-speaking');
const interruptBtn = document.getElementById('interrupt-btn');
const historyToggle = document.getElementById('history-toggle');
const chatHistory = document.getElementById('chat-history');
const closeHistory = document.getElementById('close-history');
const messagesContainer = document.getElementById('messages-container');
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
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showAgentSpeaking() {
  agentSpeaking.style.display = 'flex';
  isAgentSpeaking = true;
}

function hideAgentSpeaking() {
  agentSpeaking.style.display = 'none';
  isAgentSpeaking = false;
}

// ============================================
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
    voiceBtn.classList.add('recording');
    textInput.placeholder = 'Listening...';
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textInput.value = transcript;
    sendMessage(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    isRecording = false;
    voiceBtn.classList.remove('recording');
    textInput.placeholder = 'Type your message or use voice...';
  };

  recognition.onend = () => {
    isRecording = false;
    voiceBtn.classList.remove('recording');
    textInput.placeholder = 'Type your message or use voice...';
  };
}

// ============================================
// AGENT SDK CALLBACKS
// ============================================
const callbacks = {
  // Link video element to WebRTC stream
  onSrcObjectReady(srcObject) {
    console.log('✅ Video stream ready');
    liveVideo.srcObject = srcObject;
    liveVideo.muted = false;
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

// ============================================
// MESSAGE HANDLING
// ============================================
async function sendMessage(message) {
  if (!isConnected || !message.trim()) return;

  try {
    addMessage(message, 'user');
    textInput.value = '';
    sendBtn.disabled = true;

    // Send chat message to agent
    await agentManager.chat(message);
    
    setTimeout(() => {
      sendBtn.disabled = false;
    }, 500);

  } catch (error) {
    console.error('❌ Failed to send message:', error);
    sendBtn.disabled = false;
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

// Send button
sendBtn.addEventListener('click', () => {
  const message = textInput.value.trim();
  if (message) {
    sendMessage(message);
  }
});

// Enter key to send
textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const message = textInput.value.trim();
    if (message) {
      sendMessage(message);
    }
  }
});

// Voice button
voiceBtn.addEventListener('click', () => {
  if (!recognition) return;
  
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

// Interrupt button
interruptBtn.addEventListener('click', async () => {
  if (!isConnected || !isAgentSpeaking) return;
  
  try {
    await agentManager.interrupt({ type: 'click' });
    console.log('🛑 Agent interrupted');
  } catch (error) {
    console.error('❌ Failed to interrupt:', error);
  }
});

// Suggestion cards
suggestionCards.forEach(card => {
  card.addEventListener('click', async () => {
    if (!isConnected) return;
    
    const prompt = card.dataset.prompt;
    if (!prompt) return;

    card.classList.add('loading');
    
    try {
      await agentManager.chat(prompt);
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
historyToggle.addEventListener('click', () => {
  chatHistory.classList.add('open');
});

closeHistory.addEventListener('click', () => {
  chatHistory.classList.remove('open');
});

// Close history when clicking outside
document.addEventListener('click', (e) => {
  if (chatHistory.classList.contains('open') && 
      !chatHistory.contains(e.target) && 
      !historyToggle.contains(e.target)) {
    chatHistory.classList.remove('open');
  }
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