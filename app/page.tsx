'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  // All your client-side logic is now safely inside a useEffect hook.
  useEffect(() => {
    const concepts = [
        { name: 'Topic', emoji: '📂', description: 'A category or feed name to which records are published. Think of it as a table in a database or a folder in a filesystem.' },
        { name: 'Partition', emoji: '📦', description: 'Topics are split into partitions. Each partition is an ordered, immutable sequence of records that is continually appended to. This allows for parallel processing.' },
        { name: 'Producer', emoji: '✍️', description: 'An application that publishes (writes) a stream of records to one or more Kafka topics.' },
        { name: 'Consumer', emoji: '📖', description: 'An application that subscribes to (reads and processes) a stream of records from one or more topics.' },
        { name: 'Broker', emoji: '🏢', description: 'A Kafka server that stores data. A Kafka cluster is composed of one or more brokers, providing load balancing and fault tolerance.' },
        { name: 'Consumer Group', emoji: '👨‍👩‍👧‍👦', description: 'A group of consumers that work together to consume a topic. Each partition is consumed by exactly one consumer in the group, ensuring messages are processed once.' }
    ];

    const features = [
        { name: 'High Throughput', icon: '⚡', description: 'Can handle hundreds of thousands of messages per second.' },
        { name: 'Scalability', icon: '↔️', description: 'Easily scales out by adding more brokers to the cluster.' },
        { name: 'Fault Tolerance', icon: '🛡️', description: 'Data is replicated across multiple brokers to prevent data loss.' },
        { name: 'Durability', icon: '💾', description: 'Messages are persisted on disk, making them durable.' },
        { name: 'Decoupling', icon: '🔗', description: 'Producers and consumers are fully independent and unaware of each other.' },
        { name: 'Real-Time', icon: '⏱️', description: 'Provides low-latency message delivery for real-time applications.' },
    ];

    const useCases = [
        { name: 'Messaging', description: 'A more reliable and scalable alternative to traditional message brokers.' },
        { name: 'Website Activity Tracking', description: 'Real-time monitoring of user activity like page views, searches, or clicks.' },
        { name: 'Log Aggregation', description: 'Collecting and processing logs from multiple services in a central place.' },
        { name: 'Stream Processing', description: 'Building real-time data pipelines that transform or react to streams of data.' },
        { name: 'Event Sourcing', description: 'Using a sequence of events as the single source of truth for application state.' },
        { name: 'Metrics Collection', description: 'Aggregating metrics from various distributed applications for monitoring.' },
    ];

    const flowExplanations = {
        'flow-producer': {
            title: 'Producer Applications',
            text: 'Producers are client applications that create and send records (messages) to the Kafka cluster. They specify which topic a record belongs to. Kafka handles routing the record to the correct broker and partition.'
        },
        'flow-broker': {
            title: 'Broker Cluster & Topics',
            text: 'Brokers are the servers that form the Kafka cluster. They receive records from producers and store them durably in partitions within topics. They serve data to consumers and handle replication for fault tolerance.'
        },
        'flow-consumer': {
            title: 'Consumer Applications',
            text: 'Consumers are client applications that subscribe to topics and process the stream of records. Consumers read messages from a specific offset and can be organized into consumer groups to parallelize processing.'
        }
    };

    const conceptsGrid = document.getElementById('concepts-grid');
    if (conceptsGrid) {
      conceptsGrid.innerHTML = ''; // Clear existing content to prevent duplicates on re-render
      concepts.forEach(concept => {
          const card = document.createElement('div');
          card.className = 'concept-card bg-white p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent';
          card.innerHTML = `
              <div class="flex items-center justify-between">
                  <h3 class="text-2xl font-semibold text-[#3D405B]">${concept.name}</h3>
                  <span class="text-3xl">${concept.emoji}</span>
              </div>
              <div class="concept-card-details mt-4">
                  <p class="text-gray-600">${concept.description}</p>
              </div>
          `;
          conceptsGrid.appendChild(card);
      });
    }

    const featuresContainer = document.querySelector('#features .grid');
    if (featuresContainer) {
      featuresContainer.innerHTML = '';
      features.forEach(feature => {
          featuresContainer.innerHTML += `
              <div class="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
                  <span class="text-3xl mt-1">${feature.icon}</span>
                  <div>
                      <h4 class="text-xl font-semibold text-[#81B29A]">${feature.name}</h4>
                      <p class="text-gray-600">${feature.description}</p>
                  </div>
              </div>
          `;
      });
    }

    const useCasesContainer = document.querySelector('#use-cases .grid');
    if (useCasesContainer) {
      useCasesContainer.innerHTML = '';
      useCases.forEach(useCase => {
          useCasesContainer.innerHTML += `
              <div class="bg-white p-6 rounded-lg shadow-md">
                  <h4 class="text-xl font-semibold text-[#E07A5F]">${useCase.name}</h4>
                  <p class="text-gray-600 mt-2">${useCase.description}</p>
              </div>
          `;
      });
    }

    conceptsGrid?.addEventListener('click', function(e) {
        const card = (e.target as HTMLElement).closest('.concept-card');
        if (card) {
            card.classList.toggle('open');
        }
    });

    function handleTabSwitch(tabButtons: NodeListOf<Element>, tabContents: NodeListOf<Element>) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const targetSelector = (button as HTMLElement).dataset.tabTarget;
                if (targetSelector) {
                  const target = document.querySelector(targetSelector);
                  tabContents.forEach(content => content.classList.add('hidden'));
                  target?.classList.remove('hidden');
                }
            });
        });
    }

    const featuresUseCasesTabs = document.querySelectorAll('.features-use-cases-tab');
    const featuresUseCasesContents = document.querySelectorAll('.features-use-cases-content');
    handleTabSwitch(featuresUseCasesTabs, featuresUseCasesContents);
    
    const gettingStartedTabs = document.querySelectorAll('.getting-started-tab');
    const gettingStartedContents = document.querySelectorAll('.getting-started-content');
    handleTabSwitch(gettingStartedTabs, gettingStartedContents);
    
    const flowElements = document.querySelectorAll('.flow-element');
    const explanationBox = document.getElementById('flow-explanation');
    flowElements.forEach(el => {
        el.addEventListener('click', () => {
            flowElements.forEach(elem => {
                (elem as HTMLElement).style.borderColor = 'transparent';
                (elem as HTMLElement).style.transform = 'scale(1)';
            });
            (el as HTMLElement).style.borderColor = '#E07A5F';
            (el as HTMLElement).style.transform = 'scale(1.05)';
            
            const data = flowExplanations[el.id as keyof typeof flowExplanations];
            if (explanationBox && data) {
              explanationBox.innerHTML = `
                  <h4 class="text-xl font-bold text-[#3D405B] mb-2">${data.title}</h4>
                  <p class="text-lg text-gray-700">${data.text}</p>
              `;
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('#main-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px', threshold: 0 });

    document.querySelectorAll('main section').forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetSelector = (button as HTMLElement).dataset.clipboardTarget;
            if (!targetSelector) return;

            const codeBlock = document.querySelector(targetSelector);
            const textToCopy = (codeBlock as HTMLElement)?.innerText;
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        });
    });

    // Cleanup function to remove observers when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array means this effect runs once after initial render.

  return (
    <>
      {/* Scripts are loaded using the Next.js Script component */}
      <Script src="https://cdn.tailwindcss.com" />
      <Script src="https://cdn.jsdelivr.net/npm/chart.js" />
      
      {/* This is not standard Next.js practice. 
        Ideally, these styles should be in a global CSS file (e.g., app/globals.css)
        and fonts should be loaded with next/font. But for a direct fix, this works.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
            background-color: #F8F7F4;
            color: #3D405B;
        }
        .nav-link {
            transition: all 0.2s ease-in-out;
        }
        .nav-link.active, .nav-link:hover {
            background-color: #E07A5F;
            color: #FFFFFF;
            transform: translateX(4px);
        }
        .tab-btn.active {
            border-color: #E07A5F;
            background-color: #E07A5F;
            color: #FFFFFF;
        }
        .concept-card-details {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;
        }
        .concept-card.open .concept-card-details {
            max-height: 500px; /* Adjust if content is taller */
        }
        .flow-diagram-arrow {
            position: relative;
            width: 100%;
            height: 4px;
            background-color: #81B29A;
            margin: 0 1rem;
        }
        .flow-diagram-arrow::after {
            content: '';
            position: absolute;
            right: -8px;
            top: -6px;
            border: 8px solid transparent;
            border-left-color: #81B29A;
        }
        @media (max-width: 768px) {
            .flow-diagram {
                flex-direction: column;
                align-items: center;
            }
            .flow-diagram-arrow {
                width: 4px;
                height: 50px;
                margin: 1rem 0;
            }
            .flow-diagram-arrow::after {
                right: -6px;
                top: auto;
                bottom: -8px;
                border: 8px solid transparent;
                border-top-color: #81B29A;
                border-left-color: transparent;
            }
        }
        pre {
            background-color: #2d3748;
            color: #e2e8f0;
            padding: 1.5rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            position: relative;
        }
        .copy-btn {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            background-color: #4a5568;
            color: #e2e8f0;
            padding: 0.25rem 0.75rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .copy-btn:hover {
            background-color: #718096;
        }
      `}</style>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#F4F1DE] p-4 md:p-6 md:sticky top-0 h-auto md:h-screen shadow-lg z-20">
            <h1 className="text-2xl font-bold text-[#3D405B] mb-8">Kafka Guide</h1>
            <nav id="main-nav" className="flex flex-row md:flex-col gap-2">
                <a href="#welcome" className="nav-link active text-lg font-medium p-3 rounded-lg">Welcome</a>
                <a href="#concepts" className="nav-link text-lg font-medium p-3 rounded-lg">Core Concepts</a>
                <a href="#how-it-works" className="nav-link text-lg font-medium p-3 rounded-lg">How It Works</a>
                <a href="#features-use-cases" className="nav-link text-lg font-medium p-3 rounded-lg">Features & Cases</a>
                <a href="#getting-started" className="nav-link text-lg font-medium p-3 rounded-lg">Getting Started</a>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
            
            {/* Welcome Section */}
            <section id="welcome" className="min-h-[60vh] flex flex-col justify-center mb-16">
                <h2 className="text-5xl font-bold text-[#E07A5F] mb-4">An Interactive Introduction to Apache Kafka</h2>
                <p className="text-xl text-[#3D405B] max-w-3xl">
                    This guide transforms the standard presentation on Kafka into an interactive experience. Explore the fundamental concepts, architecture, and use cases of the powerful distributed streaming platform at your own pace.
                </p>
                <div className="mt-8 p-6 bg-white/60 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-2xl font-semibold text-[#81B29A] mb-2">What is Kafka?</h3>
                    <p className="text-lg mb-2"><strong className="font-semibold">Definition:</strong> A distributed streaming platform that allows you to publish, subscribe to, store, and process streams of records in real-time.</p>
                    <p className="text-lg mb-2"><strong className="font-semibold">Origin:</strong> Originally developed at LinkedIn and later open-sourced as a project of the Apache Software Foundation.</p>
                    <p className="text-lg"><strong className="font-semibold">Core Idea:</strong> It functions like a supercharged messaging system, enabling high-throughput, fault-tolerant data pipelines and streaming applications.</p>
                </div>
            </section>

            {/* Core Concepts Section */}
            <section id="concepts" className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Core Concepts</h2>
                <p className="text-lg max-w-3xl mb-8">
                    Kafka's power comes from a few simple but powerful ideas. Click on each card below to learn about the key components that make up the Kafka ecosystem. Understanding these concepts is the first step to mastering Kafka.
                </p>
                <div id="concepts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Concept cards will be injected here by JS */}
                </div>
            </section>
            
            {/* How It Works Section */}
            <section id="how-it-works" className="mb-16">
                <h2 className="text-4xl font-bold mb-8">How It Works: The Data Flow</h2>
                <p className="text-lg max-w-3xl mb-8">
                    At its heart, Kafka facilitates a simple flow of data from producers to consumers through a central, durable log. This section provides an interactive visualization of that process. Click on each element in the diagram to see its role in the system.
                </p>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                    <div className="flow-diagram flex items-center justify-center w-full mb-8">
                        <div id="flow-producer" className="flow-element text-center p-6 bg-[#F4F1DE] rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 border-transparent">
                            <span className="text-4xl">📬</span>
                            <h3 className="text-xl font-semibold mt-2">Producer</h3>
                        </div>
                        <div className="flow-diagram-arrow"></div>
                        <div id="flow-broker" className="flow-element text-center p-6 bg-[#F4F1DE] rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 border-transparent">
                            <span className="text-4xl">🗂️</span>
                            <h3 className="text-xl font-semibold mt-2">Broker (Topic)</h3>
                        </div>
                        <div className="flow-diagram-arrow"></div>
                        <div id="flow-consumer" className="flow-element text-center p-6 bg-[#F4F1DE] rounded-lg shadow-md cursor-pointer transition-all duration-300 border-2 border-transparent">
                            <span className="text-4xl">💻</span>
                            <h3 className="text-xl font-semibold mt-2">Consumer</h3>
                        </div>
                    </div>
                    <div id="flow-explanation" className="mt-4 p-6 bg-gray-50 rounded-lg min-h-[100px] transition-all duration-300">
                        <p className="text-lg text-gray-600">Click an element above to learn more about its function.</p>
                    </div>
                </div>
            </section>

            {/* Features and Use Cases Section */}
            <section id="features-use-cases" className="mb-16">
                 <h2 className="text-4xl font-bold mb-8">Features & Use Cases</h2>
                 <p className="text-lg max-w-3xl mb-8">
                     Kafka's unique architecture provides a powerful set of features, making it suitable for a wide variety of applications. Use the tabs below to explore its key characteristics and see how companies are using it to build modern data systems.
                 </p>
                 <div className="flex mb-6 border-b border-gray-300">
                     <button data-tab-target="#features" className="tab-btn features-use-cases-tab active py-2 px-6 font-semibold text-lg border-b-2">Features</button>
                     <button data-tab-target="#use-cases" className="tab-btn features-use-cases-tab py-2 px-6 font-semibold text-lg border-b-2 border-transparent">Use Cases</button>
                 </div>
                 <div id="features" className="tab-content features-use-cases-content">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Features will be injected here by JS */}
                     </div>
                 </div>
                 <div id="use-cases" className="tab-content features-use-cases-content hidden">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {/* Use cases will be injected here by JS */}
                     </div>
                 </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="mb-16">
                <h2 className="text-4xl font-bold mb-8">Getting Started</h2>
                <p className="text-lg max-w-3xl mb-8">
                    Ready to try Kafka yourself? This section provides a high-level overview of the setup process and conceptual code examples for producing and consuming messages. Use the tabs to navigate between the setup guide and the code samples.
                </p>
                <div className="flex mb-6 border-b border-gray-300">
                    <button data-tab-target="#setup" className="tab-btn getting-started-tab active py-2 px-6 font-semibold text-lg border-b-2">Setup Guide</button>
                    <button data-tab-target="#producer-code" className="tab-btn getting-started-tab py-2 px-6 font-semibold text-lg border-b-2 border-transparent">Producer Example</button>
                    <button data-tab-target="#consumer-code" className="tab-btn getting-started-tab py-2 px-6 font-semibold text-lg border-b-2 border-transparent">Consumer Example</button>
                </div>
                <div id="setup" className="tab-content getting-started-content bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                     <h3 className="text-2xl font-semibold mb-4">Basic Environment Setup</h3>
                     <ol className="list-decimal list-inside space-y-4 text-lg">
                         <li><strong className="font-semibold">Prerequisites:</strong> Ensure you have a recent version of the Java Development Kit (JDK) installed on your system.</li>
                         <li><strong className="font-semibold">Download Kafka:</strong> Get the latest binary release from the official Apache Kafka website.</li>
                         <li><strong className="font-semibold">Start ZooKeeper:</strong> Kafka uses ZooKeeper for cluster management. Start the ZooKeeper server using the script provided with Kafka.</li>
                         <li><strong className="font-semibold">Start Kafka Broker:</strong> In a separate terminal, start the Kafka broker server.</li>
                         <li><strong className="font-semibold">Create a Topic:</strong> Use the command-line tools to create your first topic. This is the channel your messages will be sent to.</li>
                         <li><strong className="font-semibold">Ready to Go:</strong> Your single-node Kafka cluster is now running and ready to send and receive messages!</li>
                     </ol>
                </div>
                <div id="producer-code" className="tab-content getting-started-content hidden">
                    <pre><button className="copy-btn" data-clipboard-target="#producer-code-block">Copy</button><code id="producer-code-block">{`// Configure producer properties
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Create a producer
Producer<String, String> producer = new KafkaProducer<>(props);

// Send a message
producer.send(new ProducerRecord<>("my-topic", "key", "Hello, Kafka!"));

// Close the producer
producer.close();`}</code></pre>
                </div>
                <div id="consumer-code" className="tab-content getting-started-content hidden">
                    <pre><button className="copy-btn" data-clipboard-target="#consumer-code-block">Copy</button><code id="consumer-code-block">{`// Configure consumer properties
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

// Create a consumer
KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);

// Subscribe to a topic
consumer.subscribe(Collections.singletonList("my-topic"));

// Poll for new messages
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        System.out.printf("Received message: value = %s%n", record.value());
    }
}`}</code></pre>
                </div>
            </section>
        </main>
      </div>
    </>
  );
}
