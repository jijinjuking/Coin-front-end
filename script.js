// 模拟实时数据更新
function updateTokenData() {
    const priceElement = document.querySelector('.price-value');
    const changeElement = document.querySelector('.price-change');
    const poolElement = document.querySelector('.pool-value');
    const mcapElement = document.querySelector('.mcap-value');
    
    if (priceElement) {
        // 模拟价格波动
        const basePrice = 0.0245;
        const variation = (Math.random() - 0.5) * 0.001; // ±0.0005的波动
        const newPrice = (basePrice + variation).toFixed(4);
        
        priceElement.textContent = `$${newPrice}`;
        
        // 更新涨跌幅
        const changePercent = ((variation / basePrice) * 100).toFixed(2);
        const isPositive = variation >= 0;
        
        changeElement.textContent = `${isPositive ? '+' : ''}${changePercent}%`;
        changeElement.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
        
        // 更新池子数据
        if (poolElement) {
            const basePool = 1256890;
            const poolVariation = Math.floor(Math.random() * 10000) - 5000;
            const newPool = (basePool + poolVariation).toLocaleString();
            poolElement.textContent = `$${newPool}`;
        }
        
        // 更新市值
        if (mcapElement) {
            const totalSupply = 2100000000;
            const currentPrice = parseFloat(newPrice);
            const marketCap = Math.floor(totalSupply * currentPrice);
            mcapElement.textContent = `$${marketCap.toLocaleString()}`;
        }
    }
}

// 数字动画效果
function animateNumber(element, start, end, duration = 2000) {
    const startTime = performance.now();
    const isDecimal = end.toString().includes('.');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (end - start) * easeOutCubic(progress);
        
        if (isDecimal) {
            element.textContent = current.toFixed(4);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// 初始化数字动画
function initializeAnimations() {
    const priceValue = document.querySelector('.price-value');
    const supplyValue = document.querySelector('.supply-value');
    const poolValue = document.querySelector('.pool-value');
    const mcapValue = document.querySelector('.mcap-value');
    
    if (priceValue) {
        priceValue.textContent = '$0.0000';
        setTimeout(() => animateNumber(priceValue, 0, 0.0245), 500);
    }
    
    if (supplyValue) {
        supplyValue.textContent = '0';
        setTimeout(() => {
            const element = supplyValue;
            element.textContent = '2,100,000,000';
            element.style.animation = 'countUp 2s ease-out';
        }, 800);
    }
    
    if (poolValue) {
        poolValue.textContent = '$0';
        setTimeout(() => {
            const element = poolValue;
            element.textContent = '$1,256,890';
            element.style.animation = 'countUp 2s ease-out';
        }, 1100);
    }
    
    if (mcapValue) {
        mcapValue.textContent = '$0';
        setTimeout(() => {
            const element = mcapValue;
            element.textContent = '$51,450,000';
            element.style.animation = 'countUp 2s ease-out';
        }, 1400);
    }
}

// 添加CSS动画
const countUpStyle = document.createElement('style');
countUpStyle.textContent = `
    @keyframes countUp {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .info-card:hover .info-icon {
        animation: pulse 0.6s ease-in-out;
    }
    
    .tokenomics-item {
        animation: slideInUp 0.8s ease forwards;
    }
    
    .tokenomics-item:nth-child(1) { animation-delay: 0.1s; }
    .tokenomics-item:nth-child(2) { animation-delay: 0.2s; }
    .tokenomics-item:nth-child(3) { animation-delay: 0.3s; }
    .tokenomics-item:nth-child(4) { animation-delay: 0.4s; }
`;
document.head.appendChild(countUpStyle);

// DOM元素
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const navItems = document.querySelectorAll('.nav-item, .sidebar-menu a');
const contentSections = document.querySelectorAll('.content-section');

// 侧边栏控制
function openSidebar() {
    sidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 事件监听器
menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// 导航切换
function switchSection(targetSection) {
    // 隐藏所有内容区域
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标区域
    const target = document.getElementById(targetSection);
    if (target) {
        target.classList.add('active');
    }
    
    // 更新导航状态
    updateNavState(targetSection);
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 关闭侧边栏（如果是移动端）
    closeSidebar();
}

function updateNavState(activeSection) {
    // 移除所有活动状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 添加活动状态到对应的导航项
    navItems.forEach(item => {
        const section = item.getAttribute('data-section');
        if (section === activeSection) {
            item.classList.add('active');
        }
    });
}

// 为所有导航项添加点击事件
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = item.getAttribute('data-section');
        switchSection(targetSection);
    });
});

// 键盘导航
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeSidebar();
    }
});

// 触摸手势支持
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeRatio = Math.abs(touchEndX - touchStartX) / Math.abs(touchEndY - touchStartY);
    
    // 水平滑动
    if (Math.abs(touchEndX - touchStartX) > swipeThreshold && swipeRatio > 1.5) {
        if (touchEndX > touchStartX) {
            // 向右滑动 - 打开侧边栏
            if (touchStartX < 50) {
                openSidebar();
            }
        } else {
            // 向左滑动 - 关闭侧边栏
            if (sidebar.classList.contains('active')) {
                closeSidebar();
            }
        }
    }
}

// 表单处理
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmit();
    });
}

function handleFormSubmit() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // 显示加载状态
    submitBtn.textContent = '发送中...';
    submitBtn.disabled = true;
    
    // 模拟表单提交
    setTimeout(() => {
        // 重置表单
        contactForm.reset();
        
        // 显示成功消息
        showNotification('消息发送成功！我们会尽快回复您。', 'success');
        
        // 恢复按钮状态
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// 通知系统
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 添加样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        fontSize: '0.9rem',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// 滚动效果
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 头部显示/隐藏
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // 向下滚动
        header.style.transform = 'translateY(-100%)';
    } else {
        // 向上滚动
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    // 添加滚动阴影
    if (scrollTop > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// 添加头部过渡效果
header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// 图片懒加载（如果有真实图片）
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// 动画效果
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.feature-card, .service-item, .portfolio-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        animationObserver.observe(el);
    });
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        font-family: inherit !important;
    }
`;
document.head.appendChild(style);

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 优化滚动事件
const optimizedScrollHandler = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
    
    if (scrollTop > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// CTA按钮动画和事件处理
const ctaBtns = document.querySelectorAll('.cta-btn');
ctaBtns.forEach(btn => {
    btn.addEventListener('click', (event) => {
        // 创建涟漪效果
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // 根据按钮类型执行不同操作
        if (btn.classList.contains('primary')) {
            // 主要按钮 - 跳转到交易
            showNotification('🚀 正在跳转到交易平台...', 'success');
            setTimeout(() => {
                window.open('https://pancakeswap.finance/', '_blank');
            }, 1000);
        } else if (btn.classList.contains('secondary')) {
            // 次要按钮 - 显示更多信息
            showNotification('📖 了解更多 King Coin 信息', 'info');
            switchSection('about');
        }
    });
});

// 添加涟漪效果CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .cta-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// King Coin前端界面功能
function initializeKingCoinDashboard() {
    // 更新当前时间
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);
    
    // 初始化图表交互
    initializeChartInteraction();
    
    // 初始化标签页切换
    initializeTabSwitching();
    
    // 初始化按钮功能
    initializeButtonFunctions();
    
    // 模拟数据更新
    setInterval(updateDashboardData, 10000); // 每10秒更新一次
}

// 更新当前时间
function updateCurrentTime() {
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// 更新仪表板数据
function updateDashboardData() {
    // 更新当前价格
    const priceElement = document.getElementById('currentPrice');
    if (priceElement) {
        const basePrice = 0.0245;
        const variation = (Math.random() - 0.5) * 0.002;
        const newPrice = (basePrice + variation).toFixed(4);
        priceElement.textContent = newPrice;
        
        // 更新价格变化
        const changePercent = ((variation / basePrice) * 100).toFixed(2);
        const priceChangeElement = document.querySelector('.current-price .price-change');
        if (priceChangeElement) {
            const isPositive = variation >= 0;
            priceChangeElement.textContent = `今日 ${isPositive ? '+' : ''}$${Math.abs(variation).toFixed(4)} (${isPositive ? '+' : ''}${changePercent}%)`;
            priceChangeElement.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
        }
    }
    
    // 更新用户余额价值
    const balanceValueElement = document.getElementById('balanceValue');
    const userBalanceElement = document.getElementById('userBalance');
    if (balanceValueElement && userBalanceElement) {
        const balance = parseInt(userBalanceElement.textContent.replace(/,/g, ''));
        const currentPrice = parseFloat(document.getElementById('currentPrice').textContent);
        const totalValue = (balance * currentPrice).toFixed(2);
        balanceValueElement.textContent = `$${totalValue}`;
    }
}

// 初始化图表交互
function initializeChartInteraction() {
    const timeButtons = document.querySelectorAll('.time-btn');
    timeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有active类
            timeButtons.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            btn.classList.add('active');
            
            // 模拟图表更新
            updateKlineChart(btn.dataset.period);
        });
    });
}

// 更新K线图
function updateKlineChart(period) {
    const klineBars = document.querySelectorAll('.kline-bar');
    klineBars.forEach((bar, index) => {
        // 随机生成新的高度
        const newHeight = Math.floor(Math.random() * 80) + 20;
        bar.style.height = newHeight + '%';
        
        // 随机红绿
        const isGreen = Math.random() > 0.5;
        bar.className = `kline-bar ${isGreen ? 'green' : 'red'}`;
        
        // 添加动画延迟
        setTimeout(() => {
            bar.style.animation = 'barGrow 1s ease-out';
        }, index * 100);
    });
    
    showNotification(`📈 已切换到 ${period} 时间周期`, 'info');
}

// 初始化标签页切换
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有active类
            tabButtons.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            btn.classList.add('active');
            
            // 根据选择的标签过滤记录
            filterAssetRecords(btn.dataset.tab);
        });
    });
}

// 过滤资产记录
function filterAssetRecords(filter) {
    const recordItems = document.querySelectorAll('.record-item');
    recordItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'inbound' && item.classList.contains('inbound')) {
            item.style.display = 'flex';
        } else if (filter === 'outbound' && item.classList.contains('outbound')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 初始化按钮功能
function initializeButtonFunctions() {
    // 刷新按钮
    const refreshBtn = document.getElementById('refreshBalance');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBalance();
        });
    }
    
    // 操作按钮
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const action = e.target.textContent.trim();
            handleBalanceAction(action);
        });
    });
    
    // 交易记录筛选
    const filterSelect = document.getElementById('transactionFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            filterTransactions(e.target.value);
        });
    }
    
    // 导出按钮
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportAssetRecords();
        });
    }
    
    // 加载更多按钮
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreTransactions();
        });
    }
}

// 刷新余额
function refreshBalance() {
    const refreshBtn = document.getElementById('refreshBalance');
    const originalText = refreshBtn.innerHTML;
    
    // 显示加载状态
    refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> 刷新中...';
    refreshBtn.disabled = true;
    
    // 模拟API调用
    setTimeout(() => {
        // 随机更新余额
        const currentBalance = parseInt(document.getElementById('userBalance').textContent.replace(/,/g, ''));
        const variation = Math.floor(Math.random() * 2000) - 1000; // ±1000的变化
        const newBalance = Math.max(0, currentBalance + variation);
        
        document.getElementById('userBalance').textContent = newBalance.toLocaleString();
        
        // 更新余额价值
        updateDashboardData();
        
        // 恢复按钮状态
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        showNotification('💰 余额已刷新', 'success');
    }, 2000);
}

// 处理余额操作
function handleBalanceAction(action) {
    let message, icon;
    switch(action) {
        case '转出':
            message = '🚀 转出功能开发中...';
            icon = 'info';
            break;
        case '收款':
            message = '📥 收款功能开发中...';
            icon = 'info';
            break;
        case '交易':
            message = '💱 正在跳转到交易页面...';
            icon = 'success';
            break;
        default:
            message = '功能开发中...';
            icon = 'info';
    }
    
    showNotification(message, icon);
}

// 过滤交易记录
function filterTransactions(filter) {
    const transactionItems = document.querySelectorAll('.transaction-item');
    transactionItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (item.classList.contains(filter)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    const filterText = {
        'all': '全部交易',
        'buy': '买入记录',
        'sell': '卖出记录',
        'transfer': '转账记录'
    };
    
    showNotification(`📊 已筛选: ${filterText[filter]}`, 'info');
}

// 导出资产记录
function exportAssetRecords() {
    showNotification('📄 正在生成导出文件...', 'info');
    
    // 模拟导出过程
    setTimeout(() => {
        showNotification('✅ 资产记录已导出到下载文件夹', 'success');
    }, 2000);
}

// 加载更多交易记录
function loadMoreTransactions() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const originalText = loadMoreBtn.textContent;
    
    loadMoreBtn.textContent = '加载中...';
    loadMoreBtn.disabled = true;
    
    // 模拟加载过程
    setTimeout(() => {
        loadMoreBtn.textContent = originalText;
        loadMoreBtn.disabled = false;
        showNotification('📊 更多交易记录已加载', 'success');
    }, 1500);
}

// 个人页面功能

// 复制地址功能
function copyAddress() {
    const address = document.getElementById('walletAddress').textContent;
    navigator.clipboard.writeText(address).then(() => {
        showNotification('📋 地址已复制到剪贴板', 'success');
        
        // 动画效果
        const addressElement = document.getElementById('walletAddress');
        addressElement.style.background = '#dcfce7';
        addressElement.style.borderColor = '#10b981';
        setTimeout(() => {
            addressElement.style.background = '#f8fafc';
            addressElement.style.borderColor = '#e2e8f0';
        }, 1000);
    }).catch(() => {
        showNotification('复制失败，请手动复制', 'error');
    });
}

// 显示二维码
function showQRCode() {
    const address = document.getElementById('walletAddress').textContent;
    const qrModal = document.createElement('div');
    qrModal.className = 'modal';
    qrModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>📱 收款二维码</h3>
                <button class="close-modal" onclick="closeQRModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="padding: 2rem; text-align: center;">
                <div style="width: 200px; height: 200px; background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 3rem; color: #94a3b8;">
                    <i class="fas fa-qrcode"></i>
                </div>
                <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 1rem;">扫描二维码向此地址转账</p>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 12px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 0.8rem; color: #1e293b; word-break: break-all;">
                    ${address}
                </div>
                <button onclick="copyAddress()" style="margin-top: 1rem; padding: 0.8rem 2rem; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">
                    <i class="fas fa-copy"></i> 复制地址
                </button>
            </div>
        </div>
    `;
    qrModal.id = 'qrModal';
    document.body.appendChild(qrModal);
}

function closeQRModal() {
    const qrModal = document.getElementById('qrModal');
    if (qrModal) {
        qrModal.remove();
    }
}

// 打开提现模态框
function openWithdrawModal() {
    document.getElementById('withdrawModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 打开转账模态框
function openTransferModal() {
    document.getElementById('transferModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// 打开收款模态框
function openReceiveModal() {
    showQRCode();
}

// 打开质押模态框
function openStakeModal() {
    showNotification('💰 质押功能即将上线，敬请期待！', 'info');
}

// 关闭模态框
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = '';
}

// 初始化个人页面功能
function initializePersonalPage() {
    // 初始化筛选功能
    const withdrawFilter = document.getElementById('withdrawFilter');
    const transferFilter = document.getElementById('transferFilter');
    
    if (withdrawFilter) {
        withdrawFilter.addEventListener('change', (e) => {
            filterWithdrawHistory(e.target.value);
        });
    }
    
    if (transferFilter) {
        transferFilter.addEventListener('change', (e) => {
            filterTransferHistory(e.target.value);
        });
    }
    
    // 初始化表单提交
    const withdrawForm = document.querySelector('.withdraw-form');
    const transferForm = document.querySelector('.transfer-form');
    
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', handleWithdrawSubmit);
    }
    
    if (transferForm) {
        transferForm.addEventListener('submit', handleTransferSubmit);
    }
    
    // 点击地址复制
    const walletAddress = document.getElementById('walletAddress');
    if (walletAddress) {
        walletAddress.addEventListener('click', copyAddress);
        walletAddress.style.cursor = 'pointer';
        walletAddress.title = '点击复制地址';
    }
    
    // 更新余额显示
    updatePersonalBalance();
    
    // 定时更新余额
    setInterval(updatePersonalBalance, 15000);
}

// 过滤提现记录
function filterWithdrawHistory(filter) {
    const historyItems = document.querySelectorAll('.withdraw-history .history-item');
    historyItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (item.classList.contains(filter)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    const filterText = {
        'all': '全部记录',
        'pending': '处理中',
        'completed': '已完成',
        'failed': '失败记录'
    };
    
    showNotification(`📊 已筛选: ${filterText[filter]}`, 'info');
}

// 过滤转账记录
function filterTransferHistory(filter) {
    const historyItems = document.querySelectorAll('.transfer-history .history-item');
    historyItems.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'flex';
        } else if (filter === 'sent' && item.classList.contains('transfer-sent')) {
            item.style.display = 'flex';
        } else if (filter === 'received' && item.classList.contains('transfer-received')) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    const filterText = {
        'all': '全部记录',
        'sent': '转出记录',
        'received': '收到记录'
    };
    
    showNotification(`📊 已筛选: ${filterText[filter]}`, 'info');
}

// 更新个人余额
function updatePersonalBalance() {
    const totalBalanceElement = document.getElementById('totalBalance');
    const totalValueElement = document.getElementById('totalValue');
    
    if (totalBalanceElement && totalValueElement) {
        // 模拟余额变化
        const currentBalance = parseInt(totalBalanceElement.textContent.replace(/,/g, ''));
        const variation = Math.floor(Math.random() * 1000) - 500; // ±500的变化
        const newBalance = Math.max(0, currentBalance + variation);
        
        totalBalanceElement.textContent = newBalance.toLocaleString();
        
        // 更新USD价值
        const currentPrice = 0.0245; // 基础价格
        const priceVariation = (Math.random() - 0.5) * 0.002;
        const newPrice = currentPrice + priceVariation;
        const totalValue = (newBalance * newPrice).toFixed(2);
        
        totalValueElement.textContent = `$${totalValue}`;
    }
}

// 处理提现表单提交
function handleWithdrawSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // 显示加载状态
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
    submitBtn.disabled = true;
    
    // 模拟提现处理
    setTimeout(() => {
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 关闭模态框
        closeModal('withdrawModal');
        
        // 显示成功消息
        showNotification('🚀 提现申请已提交，请耐心等待处理', 'success');
        
        // 清空表单
        form.reset();
    }, 3000);
}

// 处理转账表单提交
function handleTransferSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // 显示加载状态
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
    submitBtn.disabled = true;
    
    // 模拟转账处理
    setTimeout(() => {
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 关闭模态框
        closeModal('transferModal');
        
        // 显示成功消息
        showNotification('💸 转账成功！对方将在几分钟内收到资金', 'success');
        
        // 清空表单
        form.reset();
    }, 2500);
}

// 点击外部关闭模态框
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        if (modalId && modalId !== 'qrModal') {
            closeModal(modalId);
        } else if (modalId === 'qrModal') {
            closeQRModal();
        }
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                if (modal.id === 'qrModal') {
                    closeQRModal();
                } else {
                    closeModal(modal.id);
                }
            }
        });
    }
});

// 页面加载完成后初始化
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化动画
    animateOnScroll();
    
    // 初始化懒加载
    lazyLoadImages();
    
    // 初始化数字动画
    setTimeout(() => {
        initializeAnimations();
    }, 500);
    
    // 初始化King Coin仪表板（如果在关于页面）
    const aboutSection = document.getElementById('about');
    if (aboutSection && aboutSection.classList.contains('active')) {
        initializeKingCoinDashboard();
    }
    
    // 初始化个人页面（如果在个人页面）
    const contactSection = document.getElementById('contact');
    if (contactSection && contactSection.classList.contains('active')) {
        initializePersonalPage();
    }
    
    // 监听页面切换，在切换到对应页面时初始化
    const navItems = document.querySelectorAll('.nav-item, .sidebar-menu a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');
            if (targetSection === 'about') {
                setTimeout(() => {
                    initializeKingCoinDashboard();
                }, 100);
            } else if (targetSection === 'contact') {
                setTimeout(() => {
                    initializePersonalPage();
                }, 100);
            }
        });
    });
    
    // 显示欢迎消息
    setTimeout(() => {
        showNotification('🚀 欢迎来到 King Coin 马蹄链！', 'success');
    }, 2000);
    
    // 开始定时更新数据（每30秒）
    setInterval(updateTokenData, 30000);
    
    // 预加载关键资源
    const preloadLinks = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
    });
});

// PWA支持
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// 导出功能（如果需要模块化）
window.KingCoin = {
    switchSection,
    showNotification,
    openSidebar,
    closeSidebar,
    updateTokenData,
    initializeAnimations
};