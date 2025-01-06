// 常數配置
const CONFIG = {
    icons: {
        clock: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`,
        money: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    }
};

// 資料模型
const data = {
    pricing: {
        plans: [
            {
                name: '普通會員',
                price: '免費',
                description: '免費註冊，並可以參與平台的各項服務及媒合，享受基本功能。',
                features: [
                    '基本媒合功能',
                    '基本搜尋功能',
                    '基本會員資料',
                    '基本案件上架'
                ]
            },
            {
                name: '品牌會員',
                price: '付費升級',
                description: '升級成品牌會員後，不僅能使用所有專屬功能，還能享受更多優惠，包括推薦分潤、平台服務點數等。',
                features: [
                    '<strong>專屬網址</strong>：提升品牌專業形象，打造可信度',
                    '<strong>自選簡介風格</strong>：自定營業簡介，吸引目光',
                    '<strong>會員合作</strong>：自動推薦服務，拓展市場',
                    '<strong>課程上架</strong>：知識變現，創造新收入',
                    '<strong>推薦分潤</strong>：人脈變現，賺取分潤',
                    '<strong>優先試用</strong>：搶先體驗，掌握先機'
                ],
                highlighted: true
            }
        ]
    }
};

// 工具函數
const utils = {
    createElement: (template) => {
        const div = document.createElement('div');
        div.innerHTML = template.trim();
        return div.firstChild;
    },
    
    getElement: (id) => document.getElementById(id)
};

// 渲染函數
const renderer = {
    painPoints: {
        createItemTemplate: (point, index) => `
            <div class="relative">
                <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <span class="text-lg font-bold">${index + 1}</span>
                    </div>
                    <p class="ml-16 text-xl leading-6 font-bold text-gray-900">
                        ${point.title}
                    </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                    ${point.description}
                    <p class="mt-2 text-sm text-primary">${point.solution}</p>
                </dd>
            </div>
        `,

        render: () => {
            const container = utils.getElement('painPointsList');
            if (!container) return;

            data.painPoints.forEach((point, index) => {
                const template = renderer.painPoints.createItemTemplate(point, index);
                container.insertAdjacentHTML('beforeend', template);
            });
        }
    },

    solutions: {
        createItemTemplate: (solution, index) => `
            <div class="relative">
                <dt>
                    <div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            ${index === 0 ? CONFIG.icons.clock : CONFIG.icons.money}
                        </svg>
                    </div>
                    <p class="ml-16 text-xl leading-6 font-bold text-gray-900">
                        ${solution.title}
                    </p>
                </dt>
                <dd class="mt-2 ml-16 text-base text-gray-500">
                    ${solution.description}
                </dd>
            </div>
        `,

        render: () => {
            const container = utils.getElement('solutionsList');
            if (!container) return;

            const template = `
                <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                    ${data.solutions.map((solution, index) => 
                        renderer.solutions.createItemTemplate(solution, index)
                    ).join('')}
                </dl>
            `;
            
            container.innerHTML = template;
        }
    },

    features: {
        createListTemplate: (items, title) => `
            <div class="mb-8">
                <h3 class="text-xl font-bold text-gray-900 mb-4">${title}</h3>
                <ul class="space-y-3">
                    ${items.map(item => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 h-6 w-6 text-primary">
                                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            <span class="ml-3 text-base text-gray-500">${item}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `,

        render: () => {
            const container = utils.getElement('featuresList');
            if (!container) return;

            const template = `
                <div class="mt-10">
                    <div class="space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div>
                            ${renderer.features.createListTemplate(data.features.platformFeatures, '平台特點')}
                            ${renderer.features.createListTemplate(data.features.platformAdvantages, '平台優點')}
                        </div>
                        <div>
                            ${renderer.features.createListTemplate(data.features.platformBenefits, '平台好處')}
                        </div>
                    </div>
                </div>
            `;

            container.innerHTML = template;
        }
    },

    pricing: {
        render: () => {
            const container = utils.getElement('pricingPlans');
            if (!container) return;
            
            const template = `
                <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                    ${data.pricing.plans.map(plan => `
                        <div class="${plan.highlighted ? 'pricing-card-highlight relative' : ''} bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 divide-y divide-gray-200 transform hover:-translate-y-1">
                            <div class="p-6">
                                <h2 class="text-2xl font-semibold text-gray-900">${plan.name}</h2>
                                <p class="mt-4 text-sm text-gray-500">${plan.description}</p>
                                <p class="mt-8">
                                    <span class="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                                </p>
                                ${plan.highlighted ? `
                                    <a href="#" class="mt-8 block w-full bg-primary text-white rounded-md py-2 text-sm font-semibold text-center hover:bg-primary-dark">
                                        立即升級
                                    </a>
                                ` : ''}
                            </div>
                            <div class="pt-6 pb-8 px-6">
                                <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">
                                    ${plan.highlighted ? '專屬權益' : '包含功能'}
                                </h3>
                                <ul class="mt-6 space-y-4">
                                    ${plan.features.map(feature => `
                                        <li class="flex space-x-3">
                                            <svg class="flex-shrink-0 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                                            </svg>
                                            <span class="text-sm text-gray-500">${feature}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.innerHTML = template;
        }
    }
};

// 初始化
const init = () => {
    // 移動端選單切換
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = utils.getElement('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 渲染所有區段
    renderer.painPoints.render();
    renderer.solutions.render();
    renderer.features.render();
    renderer.pricing.render();

    // 專業服務卡片動畫
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.animationDelay || 0;
                setTimeout(() => {
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 觀察所有服務卡片
    document.querySelectorAll('[data-animation-delay]').forEach(card => {
        observer.observe(card);
    });

    // 滾動動畫
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-fade-in');
                element.classList.remove('opacity-0');
            }
        });
    };

    // 監聽滾動事件
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // 初始檢查

    // 滑鼠移動視差效果
    document.addEventListener('mousemove', (e) => {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// 當文檔加載完成時執行初始化
document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.step-card');
    let currentStep = 0;
    
    // 初始化：隱藏除了第一個以外的所有步驟
    steps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
        } else {
            step.classList.add('hidden');
        }
    });

    // 切換到下一個步驟
    function nextStep() {
        const currentCard = steps[currentStep];
        const nextCard = steps[(currentStep + 1) % steps.length];
        
        // 當前卡片離開
        currentCard.classList.remove('active');
        currentCard.classList.add('leaving');
        
        // 等待當前卡片動畫結束
        setTimeout(() => {
            currentCard.classList.add('hidden');
            currentCard.classList.remove('leaving');
            
            // 顯示下一張卡片
            nextCard.classList.remove('hidden');
            setTimeout(() => {
                nextCard.classList.add('active');
            }, 50);
            
            // 更新當前步驟
            currentStep = (currentStep + 1) % steps.length;
        }, 800);
    }

    // 每3秒切換一次
    setInterval(nextStep, 3000);
}); 