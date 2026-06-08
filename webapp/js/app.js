// 2026世界杯预测分析系统 - 主应用逻辑

// 辅助函数：获取球队国旗图片HTML
function getTeamFlagHtml(teamId, size = 'w40') {
    const team = getTeamById(teamId);
    if (team && team.flagUrl) {
        const flagSize = size === 'w40' ? '40x30' : '32x24';
        return `<img src="${team.flagUrl.replace('w320', size)}" alt="${team.name}" class="team-flag-img" style="width:${flagSize.split('x')[0]}px;height:${flagSize.split('x')[1]}px;object-fit:cover;border-radius:2px;">`;
    }
    // 回退到emoji
    return team ? `<span class="team-flag">${team.flag}</span>` : '';
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTeamSelector();
    initMatchGroupSelector();
    initPlayerFilters();
    initCompareSection();
    loadHotMatches();
    loadTeams('A');
    loadMatches('A');
    loadPlayers();
    initTournamentTree();
});

// 导航功能
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');

            // 更新导航状态
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');

            // 显示对应部分
            document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
            document.getElementById(section).classList.add('active');
        });
    });
}

// 球队选择器
function initTeamSelector() {
    const groupBtns = document.querySelectorAll('.group-btn');
    groupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            groupBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadTeams(this.getAttribute('data-group'));
        });
    });
}

// 加载球队
function loadTeams(group) {
    const teamsGrid = document.getElementById('teamsGrid');
    const teams = getTeamsByGroup(group);

    teamsGrid.innerHTML = Object.entries(teams).map(([id, team]) => `
        <div class="team-card" onclick="selectTeamForPlayers('${id}')">
            <div class="team-card-header">
                ${getTeamFlagHtml(id, 'w80')}
                <div class="team-info">
                    <h3>${team.name}</h3>
                    <p>FIFA排名: ${team.fifaRank}</p>
                </div>
            </div>
            <div class="team-stats">
                <div class="team-stat">
                    <div class="team-stat-value">${team.totalValue}</div>
                    <div class="team-stat-label">球队身价</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${team.worldCupApps}</div>
                    <div class="team-stat-label">世界杯参赛</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${team.recentForm.wins}%</div>
                    <div class="team-stat-label">近期胜率</div>
                </div>
                <div class="team-stat">
                    <div class="team-stat-value">${team.recentForm.goals}</div>
                    <div class="team-stat-label">场均进球</div>
                </div>
            </div>
        </div>
    `).join('');

    // 清空球员展示区
    document.getElementById('teamPlayersTitle').textContent = '点击球队查看球员';
    document.getElementById('teamPlayersGrid').innerHTML = '';
}

// 选择球队显示球员
function selectTeamForPlayers(teamId) {
    const team = getTeamById(teamId);
    if (!team) return;

    // 高亮选中的球队卡片
    document.querySelectorAll('.team-card').forEach(card => card.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    // 更新标题
    const title = document.getElementById('teamPlayersTitle');
    title.innerHTML = `${getTeamFlagHtml(teamId, 'w40')} ${team.name} - 球员名单`;

    // 加载球员
    const playersGrid = document.getElementById('teamPlayersGrid');
    const players = getPlayersByTeam(teamId);

    if (players.length === 0) {
        playersGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">暂无该球队球员数据</p>';
        return;
    }

    playersGrid.innerHTML = players.map(player => `
        <div class="team-player-card" onclick="showPlayerDetail('${player.id}')">
            <div class="team-player-avatar">
                <img src="${player.imageUrl}" alt="${player.name}" onerror="this.onerror=null;this.parentElement.innerHTML='<i class=\\'fas fa-user\\' style=\\'font-size:2rem;color:white;\\'></i>';">
            </div>
            <div class="team-player-name">${player.name}</div>
            <div class="team-player-position">${player.positionName} #${player.number}</div>
            <div class="team-player-stats">
                <div class="team-player-stat">
                    <div class="stat-value">${player.rating}</div>
                    <div class="stat-label">评分</div>
                </div>
                <div class="team-player-stat">
                    <div class="stat-value">${player.goals}</div>
                    <div class="stat-label">进球</div>
                </div>
                <div class="team-player-stat">
                    <div class="stat-value">${player.assists}</div>
                    <div class="stat-label">助攻</div>
                </div>
            </div>
        </div>
    `).join('');

    // 滚动到球员区域
    document.getElementById('teamPlayersSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 显示球队详情
function showTeamDetail(teamId) {
    const team = getTeamById(teamId);
    if (!team) return;

    const modal = document.getElementById('matchModal');
    const detail = document.getElementById('matchDetail');

    detail.innerHTML = `
        <div class="match-detail-header">
            <div class="match-detail-teams">
                <div class="detail-team">
                    ${getTeamFlagHtml(teamId, 'w160')}
                    <span class="name">${team.name}</span>
                </div>
            </div>
        </div>

        <div class="match-detail-info">
            <div class="detail-info-item">
                <div class="detail-info-label">FIFA排名</div>
                <div class="detail-info-value">#${team.fifaRank}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">球队身价</div>
                <div class="detail-info-value">${team.totalValue}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">主教练</div>
                <div class="detail-info-value">${team.coach}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">常用阵型</div>
                <div class="detail-info-value">${team.formation}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">世界杯参赛</div>
                <div class="detail-info-value">${team.worldCupApps}次</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">最佳成绩</div>
                <div class="detail-info-value">${team.bestResult}</div>
            </div>
        </div>

        <div class="prediction-section">
            <h3>近期表现</h3>
            <div class="prediction-grid">
                <div class="prediction-card">
                    <div class="label">胜率</div>
                    <div class="value">${team.recentForm.wins}%</div>
                </div>
                <div class="prediction-card">
                    <div class="label">场均进球</div>
                    <div class="value">${team.recentForm.goals}</div>
                </div>
                <div class="prediction-card">
                    <div class="label">场均失球</div>
                    <div class="value">${team.recentForm.conceded}</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <h3 style="margin-bottom: 10px;">核心优势</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${team.strengths.map(s => `<span style="background: rgba(16, 185, 129, 0.2); padding: 4px 12px; border-radius: 4px; color: #10b981;">${s}</span>`).join('')}
            </div>
        </div>

        <div style="margin-top: 20px;">
            <h3 style="margin-bottom: 10px;">主要短板</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${team.weaknesses.map(w => `<span style="background: rgba(239, 68, 68, 0.2); padding: 4px 12px; border-radius: 4px; color: #ef4444;">${w}</span>`).join('')}
            </div>
        </div>

        <div style="margin-top: 20px;">
            <h3 style="margin-bottom: 10px;">关键球员</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${team.keyPlayers.map(p => `<span style="background: rgba(26, 86, 219, 0.2); padding: 4px 12px; border-radius: 4px; color: #3b82f6;">${p}</span>`).join('')}
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// 初始化小组赛选择器
function initMatchGroupSelector() {
    const groupBtns = document.querySelectorAll('[data-match-group]');
    groupBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            groupBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadMatches(this.getAttribute('data-match-group'));
        });
    });
}

// 加载小组赛
function loadMatches(group) {
    const matchesList = document.getElementById('matchesList');
    const matches = getMatchesByGroup(group);

    matchesList.innerHTML = matches.map(match => `
        <div class="match-card" onclick="showMatchDetail('${match.id}')">
            <div class="match-card-header">
                <span>${match.group}组 第${match.round}轮</span>
                <span>${match.date} ${match.time}</span>
            </div>
            <div class="match-card-teams">
                <div class="match-card-team home">
                    <span class="team-name">${match.homeName}</span>
                    ${getTeamFlagHtml(match.homeTeam, 'w40')}
                </div>
                <div class="match-card-score">${match.homeScore} - ${match.awayScore}</div>
                <div class="match-card-team away">
                    ${getTeamFlagHtml(match.awayTeam, 'w40')}
                    <span class="team-name">${match.awayName}</span>
                </div>
            </div>
            <div class="match-card-prediction">
                <div class="prediction-item">
                    <div class="label">主胜</div>
                    <div class="value">${match.prediction.homeWin}%</div>
                </div>
                <div class="prediction-item">
                    <div class="label">平局</div>
                    <div class="value">${match.prediction.draw}%</div>
                </div>
                <div class="prediction-item">
                    <div class="label">客胜</div>
                    <div class="value">${match.prediction.awayWin}%</div>
                </div>
                <div class="prediction-item">
                    <div class="label">预测比分</div>
                    <div class="value">${match.prediction.predictedScore}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 初始化淘汰赛树状图
function initTournamentTree() {
    renderTreeRound32();
    renderTreeRound16();
    renderTreeQuarter();
    renderTreeSemi();
    renderTreeFinal();
    renderTreeThirdPlace();
    updateChampion();

    // 初始化控制按钮
    document.getElementById('resetBracket').addEventListener('click', function() {
        if (confirm('确定要重置所有预测吗？')) {
            resetPredictions();
            initTournamentTree();
        }
    });

    document.getElementById('saveBracket').addEventListener('click', function() {
        savePredictions();
        alert('预测已保存！');
    });
}

// 渲染32强树状图
function renderTreeRound32() {
    const rounds = getKnockoutRounds();
    const leftContainer = document.getElementById('treeRound32Left');
    const rightContainer = document.getElementById('treeRound32Right');

    // 左半区 (1-8场)
    const leftMatches = rounds.roundOf32.slice(0, 8);
    leftContainer.innerHTML = leftMatches.map(match => createTreeMatch(match, 'roundOf32')).join('');

    // 右半区 (9-16场)
    const rightMatches = rounds.roundOf32.slice(8, 16);
    rightContainer.innerHTML = rightMatches.map(match => createTreeMatch(match, 'roundOf32')).join('');
}

// 渲染16强树状图
function renderTreeRound16() {
    const rounds = getKnockoutRounds();
    const leftContainer = document.getElementById('treeRound16Left');
    const rightContainer = document.getElementById('treeRound16Right');

    // 左半区 (1-4场)
    const leftMatches = rounds.roundOf16.slice(0, 4);
    leftContainer.innerHTML = leftMatches.map(match => createTreeMatch(match, 'roundOf16')).join('');

    // 右半区 (5-8场)
    const rightMatches = rounds.roundOf16.slice(4, 8);
    rightContainer.innerHTML = rightMatches.map(match => createTreeMatch(match, 'roundOf16')).join('');
}

// 渲染8强树状图
function renderTreeQuarter() {
    const rounds = getKnockoutRounds();
    const leftContainer = document.getElementById('treeQuarterLeft');
    const rightContainer = document.getElementById('treeQuarterRight');

    // 左半区 (1-2场)
    const leftMatches = rounds.quarterFinals.slice(0, 2);
    leftContainer.innerHTML = leftMatches.map(match => createTreeMatch(match, 'quarterFinals')).join('');

    // 右半区 (3-4场)
    const rightMatches = rounds.quarterFinals.slice(2, 4);
    rightContainer.innerHTML = rightMatches.map(match => createTreeMatch(match, 'quarterFinals')).join('');
}

// 渲染半决赛树状图
function renderTreeSemi() {
    const rounds = getKnockoutRounds();
    const leftContainer = document.getElementById('treeSemiLeft');
    const rightContainer = document.getElementById('treeSemiRight');

    // 左半区 (第1场)
    leftContainer.innerHTML = createTreeMatch(rounds.semiFinals[0], 'semiFinals');

    // 右半区 (第2场)
    rightContainer.innerHTML = createTreeMatch(rounds.semiFinals[1], 'semiFinals');
}

// 渲染决赛
function renderTreeFinal() {
    const rounds = getKnockoutRounds();
    const container = document.getElementById('treeFinal');
    container.innerHTML = createTreeMatch(rounds.final, 'final', true);
}

// 渲染三四名
function renderTreeThirdPlace() {
    const rounds = getKnockoutRounds();
    const container = document.getElementById('treeThirdPlace');
    container.innerHTML = createTreeMatch(rounds.thirdPlace, 'thirdPlace');
}

// 创建树状图比赛卡片
function createTreeMatch(match, round, isFinal = false) {
    const homeTeam = match.homeTeamId ? getTeamById(match.homeTeamId) : null;
    const awayTeam = match.awayTeamId ? getTeamById(match.awayTeamId) : null;
    const hasTeams = homeTeam && awayTeam;
    const isCompleted = match.status === 'completed';

    return `
        <div class="tree-match ${isCompleted ? 'winner-selected' : ''}" onclick="selectTreeTeam('${match.id}', '${round}')">
            <div class="tree-team ${match.winner === 'home' ? 'winner' : ''}">
                ${homeTeam ? getTeamFlagHtml(match.homeTeamId, 'w40') : '<span class="team-placeholder" style="width:24px;height:18px;">?</span>'}
                <span class="team-name">${homeTeam ? homeTeam.name : '待定'}</span>
                <span class="team-score">${match.homeScore !== null ? match.homeScore : ''}</span>
            </div>
            <div class="tree-vs">VS</div>
            <div class="tree-team ${match.winner === 'away' ? 'winner' : ''}">
                ${awayTeam ? getTeamFlagHtml(match.awayTeamId, 'w40') : '<span class="team-placeholder" style="width:24px;height:18px;">?</span>'}
                <span class="team-name">${awayTeam ? awayTeam.name : '待定'}</span>
                <span class="team-score">${match.awayScore !== null ? match.awayScore : ''}</span>
            </div>
        </div>
    `;
}

// 选择树状图中的球队
function selectTreeTeam(matchId, round) {
    const rounds = getKnockoutRounds();
    let match = null;

    // 查找比赛
    if (round === 'roundOf32') match = rounds.roundOf32.find(m => m.id === matchId);
    else if (round === 'roundOf16') match = rounds.roundOf16.find(m => m.id === matchId);
    else if (round === 'quarterFinals') match = rounds.quarterFinals.find(m => m.id === matchId);
    else if (round === 'semiFinals') match = rounds.semiFinals.find(m => m.id === matchId);
    else if (round === 'thirdPlace') match = rounds.thirdPlace;
    else if (round === 'final') match = rounds.final;

    if (!match) return;

    // 如果没有球队，显示选择器
    if (!match.homeTeamId || !match.awayTeamId) {
        showTeamPickerForTree(matchId, round);
        return;
    }

    // 如果已有比分，询问新比分
    if (match.homeScore !== null) {
        const newHomeScore = prompt(`输入 ${getTeamById(match.homeTeamId).name} 的比分:`, match.homeScore);
        if (newHomeScore === null) return;
        const newAwayScore = prompt(`输入 ${getTeamById(match.awayTeamId).name} 的比分:`, match.awayScore);
        if (newAwayScore === null) return;

        setMatchResult(round, matchId, parseInt(newHomeScore), parseInt(newAwayScore));
    } else {
        // 输入比分
        const homeScore = prompt(`输入 ${getTeamById(match.homeTeamId).name} 的比分:`);
        if (homeScore === null) return;
        const awayScore = prompt(`输入 ${getTeamById(match.awayTeamId).name} 的比分:`);
        if (awayScore === null) return;

        setMatchResult(round, matchId, parseInt(homeScore), parseInt(awayScore));
    }

    // 刷新树状图
    initTournamentTree();
}

// 显示球队选择器
function showTeamPickerForTree(matchId, round) {
    const rounds = getKnockoutRounds();
    let match = null;

    if (round === 'roundOf32') match = rounds.roundOf32.find(m => m.id === matchId);
    else if (round === 'roundOf16') match = rounds.roundOf16.find(m => m.id === matchId);
    else if (round === 'quarterFinals') match = rounds.quarterFinals.find(m => m.id === matchId);
    else if (round === 'semiFinals') match = rounds.semiFinals.find(m => m.id === matchId);
    else if (round === 'thirdPlace') match = rounds.thirdPlace;
    else if (round === 'final') match = rounds.final;

    if (!match) return;

    // 创建选择器
    const modal = document.createElement('div');
    modal.className = 'team-picker-modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="team-picker-content">
            <h3>选择球队</h3>
            <p>选择主队或客队</p>
            <div class="team-picker-options">
                <button onclick="pickTeamForTree('${matchId}', '${round}', 'home')" class="btn-primary">
                    选择主队
                </button>
                <button onclick="pickTeamForTree('${matchId}', '${round}', 'away')" class="btn-primary">
                    选择客队
                </button>
            </div>
            <button onclick="this.closest('.team-picker-modal').remove()" class="btn-secondary">取消</button>
        </div>
    `;

    document.body.appendChild(modal);
}

// 选择球队
function pickTeamForTree(matchId, round, side) {
    const rounds = getKnockoutRounds();
    let match = null;

    if (round === 'roundOf32') match = rounds.roundOf32.find(m => m.id === matchId);
    else if (round === 'roundOf16') match = rounds.roundOf16.find(m => m.id === matchId);
    else if (round === 'quarterFinals') match = rounds.quarterFinals.find(m => m.id === matchId);
    else if (round === 'semiFinals') match = rounds.semiFinals.find(m => m.id === matchId);
    else if (round === 'thirdPlace') match = rounds.thirdPlace;
    else if (round === 'final') match = rounds.final;

    if (!match) return;

    // 设置获胜方
    match.winner = side;
    match.status = 'completed';
    match.homeScore = side === 'home' ? 1 : 0;
    match.awayScore = side === 'away' ? 1 : 0;

    // 晋级
    const winnerId = side === 'home' ? match.homeTeamId : match.awayTeamId;
    advanceTeam(round, matchId, winnerId);

    // 关闭选择器
    document.querySelector('.team-picker-modal')?.remove();

    // 刷新
    initTournamentTree();
}

// 更新冠军显示
function updateChampion() {
    const rounds = getKnockoutRounds();
    const championDisplay = document.getElementById('championDisplay');
    const championTeam = document.getElementById('championTeam');

    if (rounds.final.status === 'completed' && rounds.final.winner) {
        const winnerId = rounds.final.winner === 'home' ? rounds.final.homeTeamId : rounds.final.awayTeamId;
        const team = getTeamById(winnerId);
        if (team) {
            championTeam.innerHTML = `${getTeamFlagHtml(winnerId, 'w80')} ${team.name}`;
            championDisplay.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
        }
    } else {
        championTeam.textContent = '冠军待定';
        championDisplay.style.background = 'linear-gradient(135deg, #ffd700, #ffed4e)';
    }
}

// 保存预测
function savePredictions() {
    const predictions = getUserPredictions();
    localStorage.setItem('worldCupPredictions', JSON.stringify(predictions));
}

// 加载预测
function loadPredictions() {
    const saved = localStorage.getItem('worldCupPredictions');
    if (saved) {
        const predictions = JSON.parse(saved);
        // 应用保存的预测...
    }
}

// 显示比赛详情
function showMatchDetail(matchId) {
    const match = getMatchById(matchId);
    if (!match) return;

    const modal = document.getElementById('matchModal');
    const detail = document.getElementById('matchDetail');

    detail.innerHTML = `
        <div class="match-detail-header">
            <h2>${match.group}组 第${match.round}轮</h2>
            <div class="match-detail-teams">
                <div class="detail-team">
                    ${getTeamFlagHtml(match.homeTeam, 'w80')}
                    <span class="name">${match.homeName}</span>
                </div>
                <div class="detail-vs">VS</div>
                <div class="detail-team">
                    ${getTeamFlagHtml(match.awayTeam, 'w80')}
                    <span class="name">${match.awayName}</span>
                </div>
            </div>
        </div>

        <div class="match-detail-info">
            <div class="detail-info-item">
                <div class="detail-info-label">比赛时间</div>
                <div class="detail-info-value">${match.date} ${match.time}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">比赛场地</div>
                <div class="detail-info-value">${match.venue}</div>
            </div>
            <div class="detail-info-item">
                <div class="detail-info-label">比赛结果</div>
                <div class="detail-info-value">${match.homeScore} - ${match.awayScore}</div>
            </div>
        </div>

        <div class="prediction-section">
            <h3>预测分析</h3>
            <div class="prediction-grid">
                <div class="prediction-card">
                    <div class="label">主胜概率</div>
                    <div class="value">${match.prediction.homeWin}%</div>
                </div>
                <div class="prediction-card">
                    <div class="label">平局概率</div>
                    <div class="value">${match.prediction.draw}%</div>
                </div>
                <div class="prediction-card">
                    <div class="label">客胜概率</div>
                    <div class="value">${match.prediction.awayWin}%</div>
                </div>
                <div class="prediction-card">
                    <div class="label">预测比分</div>
                    <div class="value">${match.prediction.predictedScore}</div>
                </div>
                <div class="prediction-card">
                    <div class="label">进球数预测</div>
                    <div class="value">${match.prediction.overUnder}</div>
                </div>
                <div class="prediction-card">
                    <div class="label">预测置信度</div>
                    <div class="value">${match.prediction.confidence}%</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 20px;">
            <h3 style="margin-bottom: 10px;">比赛看点</h3>
            <ul style="list-style: none; padding: 0;">
                ${match.highlights.map(h => `
                    <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                        <i class="fas fa-star" style="color: #f59e0b; margin-right: 8px;"></i>
                        ${h}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    modal.style.display = 'block';
}

// 球员过滤器
function initPlayerFilters() {
    const playerTeamFilter = document.getElementById('playerTeamFilter');
    const positionFilter = document.getElementById('positionFilter');
    const playerSearch = document.getElementById('playerSearch');

    // 填充球队选项
    const teams = getAllTeams();
    Object.entries(teams).forEach(([id, team]) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${team.flag} ${team.name}`;
        playerTeamFilter.appendChild(option);
    });

    playerTeamFilter.addEventListener('change', loadPlayers);
    positionFilter.addEventListener('change', loadPlayers);
    playerSearch.addEventListener('input', loadPlayers);
}

// 加载球员
function loadPlayers() {
    const playersGrid = document.getElementById('playersGrid');
    const teamFilter = document.getElementById('playerTeamFilter').value;
    const positionFilter = document.getElementById('positionFilter').value;
    const searchQuery = document.getElementById('playerSearch').value;

    let players = getAllPlayers();

    if (teamFilter !== 'all') {
        players = players.filter(p => p.team === teamFilter);
    }
    if (positionFilter !== 'all') {
        players = players.filter(p => p.position === positionFilter);
    }
    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        players = players.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.nameEn.toLowerCase().includes(query)
        );
    }

    playersGrid.innerHTML = players.map(player => `
        <div class="player-card" onclick="showPlayerDetail('${player.id}')">
            <div class="player-avatar">
                <img src="${player.imageUrl}" alt="${player.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2235%22 r=%2220%22 fill=%22%2364748b%22/><path d=%22M25 90 Q25 60 50 60 Q75 60 75 90%22 fill=%22%2364748b%22/></svg>';">
            </div>
            <div class="player-name">${player.name}</div>
            <div class="player-position">${player.positionName}</div>
            <div class="player-team">${getTeamFlagHtml(player.team, 'w32')} ${player.teamName}</div>
            <div class="player-info">
                <div class="player-info-item">
                    <div class="player-info-value">${player.age}</div>
                    <div class="player-info-label">年龄</div>
                </div>
                <div class="player-info-item">
                    <div class="player-info-value">${player.height}cm</div>
                    <div class="player-info-label">身高</div>
                </div>
                <div class="player-info-item">
                    <div class="player-info-value">${player.weight}kg</div>
                    <div class="player-info-label">体重</div>
                </div>
                <div class="player-info-item">
                    <div class="player-info-value">${player.rating}</div>
                    <div class="player-info-label">评分</div>
                </div>
            </div>
        </div>
    `).join('');
}

// 显示球员详情
function showPlayerDetail(playerId) {
    const player = getPlayerById(playerId);
    if (!player) return;

    const modal = document.getElementById('playerModal');
    const detail = document.getElementById('playerDetail');

    detail.innerHTML = `
        <div class="player-detail-header">
            <div class="player-detail-avatar">
                <img src="${player.imageUrl}" alt="${player.name}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2235%22 r=%2220%22 fill=%22%2364748b%22/><path d=%22M25 90 Q25 60 50 60 Q75 60 75 90%22 fill=%22%2364748b%22/></svg>';">
            </div>
            <div class="player-detail-info">
                <h2>${player.name}</h2>
                <p class="team">${getTeamFlagHtml(player.team, 'w40')} ${player.teamName} | ${player.positionName}</p>
                <div class="player-detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value">${player.age}</div>
                        <div class="detail-stat-label">年龄</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${player.height}cm</div>
                        <div class="detail-stat-label">身高</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${player.weight}kg</div>
                        <div class="detail-stat-label">体重</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${player.club}</div>
                        <div class="detail-stat-label">俱乐部</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">#${player.number}</div>
                        <div class="detail-stat-label">球衣号码</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${player.rating}</div>
                        <div class="detail-stat-label">综合评分</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="prediction-section">
            <h3>赛季数据</h3>
            <div class="prediction-grid">
                <div class="prediction-card">
                    <div class="label">进球</div>
                    <div class="value">${player.goals}</div>
                </div>
                <div class="prediction-card">
                    <div class="label">助攻</div>
                    <div class="value">${player.assists}</div>
                </div>
                <div class="prediction-card">
                    <div class="label">国家队出场</div>
                    <div class="value">${player.caps}</div>
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// 对比部分
function initCompareSection() {
    const teamASelect = document.getElementById('teamA');
    const teamBSelect = document.getElementById('teamB');
    const compareBtn = document.getElementById('compareBtn');

    // 填充球队选项
    const teams = getAllTeams();
    Object.entries(teams).forEach(([id, team]) => {
        const optionA = document.createElement('option');
        optionA.value = id;
        optionA.textContent = `${team.flag} ${team.name}`;
        teamASelect.appendChild(optionA);

        const optionB = document.createElement('option');
        optionB.value = id;
        optionB.textContent = `${team.flag} ${team.name}`;
        teamBSelect.appendChild(optionB);
    });

    // 设置默认选择
    teamASelect.value = 'brazil';
    teamBSelect.value = 'argentina';

    compareBtn.addEventListener('click', compareTeams);
}

// 对比球队
function compareTeams() {
    const teamAId = document.getElementById('teamA').value;
    const teamBId = document.getElementById('teamB').value;

    const teamA = getTeamById(teamAId);
    const teamB = getTeamById(teamBId);

    if (!teamA || !teamB) return;

    const result = document.getElementById('compareResult');

    const stats = [
        { label: 'FIFA排名', valueA: teamA.fifaRank, valueB: teamB.fifaRank, lowerBetter: true },
        { label: '球队身价', valueA: parseFloat(teamA.totalValue.replace('€', '').replace('亿', '')), valueB: parseFloat(teamB.totalValue.replace('€', '').replace('亿', '')), lowerBetter: false },
        { label: '世界杯参赛', valueA: teamA.worldCupApps, valueB: teamB.worldCupApps, lowerBetter: false },
        { label: '近期胜率', valueA: teamA.recentForm.wins, valueB: teamB.recentForm.wins, lowerBetter: false },
        { label: '场均进球', valueA: teamA.recentForm.goals, valueB: teamB.recentForm.goals, lowerBetter: false },
        { label: '场均失球', valueA: teamA.recentForm.conceded, valueB: teamB.recentForm.conceded, lowerBetter: true }
    ];

    result.innerHTML = `
        <div class="compare-header">
            <div class="compare-team">
                ${getTeamFlagHtml(teamAId, 'w80')}
                <span class="name">${teamA.name}</span>
            </div>
            <div style="font-size: 1.5rem; font-weight: bold; color: #f59e0b;">VS</div>
            <div class="compare-team">
                ${getTeamFlagHtml(teamBId, 'w80')}
                <span class="name">${teamB.name}</span>
            </div>
        </div>

        <div class="compare-stats">
            ${stats.map(stat => {
                const total = stat.valueA + stat.valueB;
                const percentA = total > 0 ? (stat.valueA / total * 100) : 50;
                const percentB = total > 0 ? (stat.valueB / total * 100) : 50;
                const winnerA = stat.lowerBetter ? stat.valueA < stat.valueB : stat.valueA > stat.valueB;
                const winnerB = stat.lowerBetter ? stat.valueB < stat.valueA : stat.valueB > stat.valueA;

                return `
                    <div class="compare-stat-row">
                        <div class="compare-stat-label">${stat.label}</div>
                        <div class="compare-stat-bar">
                            <div class="bar-left" style="width: ${percentA}%; background: ${winnerA ? '#10b981' : '#1a56db'}"></div>
                            <div class="bar-right" style="width: ${percentB}%; background: ${winnerB ? '#10b981' : '#ef4444'}"></div>
                        </div>
                        <div class="compare-stat-values">
                            <span style="color: ${winnerA ? '#10b981' : '#f8fafc'}">${stat.valueA}</span>
                            <span style="color: ${winnerB ? '#10b981' : '#f8fafc'}">${stat.valueB}</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>

        <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #334155;">
            <h3 style="text-align: center; margin-bottom: 16px;">历史交锋分析</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">${teamA.strengths[0]}</div>
                    <div style="color: #94a3b8; font-size: 0.85rem;">${teamA.name}优势</div>
                </div>
                <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.2rem; font-weight: bold; color: #f59e0b;">${teamB.strengths[0]}</div>
                    <div style="color: #94a3b8; font-size: 0.85rem;">${teamB.name}优势</div>
                </div>
            </div>
        </div>
    `;
}

// 加载热门比赛
function loadHotMatches() {
    const hotMatches = document.getElementById('hotMatches');
    const hotMatchesList = [
        getMatchById('C1'),  // 巴西 vs 摩洛哥
        getMatchById('I1'),  // 法国 vs 伊拉克
        getMatchById('J1'),  // 阿根廷 vs 约旦
        getMatchById('L5'),  // 英格兰 vs 克罗地亚
    ].filter(Boolean);

    hotMatches.innerHTML = hotMatchesList.map(match => `
        <div class="match-card" onclick="showMatchDetail('${match.id}')">
            <div class="match-card-header">
                <span class="match-group">${match.group}组 第${match.round}轮</span>
                <span class="match-date">${match.date}</span>
            </div>
            <div class="match-teams">
                <div class="team-display">
                    ${getTeamFlagHtml(match.homeTeam, 'w40')}
                    <span class="name">${match.homeName}</span>
                </div>
                <div class="match-score">${match.homeScore} - ${match.awayScore}</div>
                <div class="team-display">
                    ${getTeamFlagHtml(match.awayTeam, 'w40')}
                    <span class="name">${match.awayName}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 关闭弹窗
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

// 点击弹窗外部关闭
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});
