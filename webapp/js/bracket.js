// 2026世界杯淘汰赛对阵图逻辑

// 初始化淘汰赛对阵
function initBracket() {
    loadBracket();
    initBracketControls();
}

// 加载淘汰赛对阵
function loadBracket() {
    const rounds = getKnockoutRounds();

    // 渲染32强
    renderBracketRound('roundOf32', rounds.roundOf32, '32 强');

    // 渲染16强
    renderBracketRound('roundOf16', rounds.roundOf16, '16 强');

    // 渲染8强
    renderBracketRound('quarterFinals', rounds.quarterFinals, '8 强');

    // 渲染半决赛
    renderBracketRound('semiFinals', rounds.semiFinals, '半决赛');

    // 渲染决赛
    renderFinalRound(rounds);
}

// 渲染单轮对阵
function renderBracketRound(containerId, matches, roundName) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = matches.map(match => {
        const homeTeam = match.homeTeamId ? getTeamById(match.homeTeamId) : null;
        const awayTeam = match.awayTeamId ? getTeamById(match.awayTeamId) : null;
        const isCompleted = match.status === 'completed';

        return `
            <div class="bracket-match" data-match-id="${match.id}">
                <div class="bracket-match-header">
                    <span>${match.id}</span>
                    <span class="bracket-match-date">${match.date} ${match.time}</span>
                </div>
                <div class="bracket-teams">
                    <div class="bracket-team ${match.winner === 'home' ? 'winner' : ''} ${!homeTeam ? 'empty' : ''}"
                         onclick="selectTeam('${match.id}', 'home', '${containerId}')"
                         data-side="home">
                        <div class="bracket-team-info">
                            <span class="bracket-team-flag">${homeTeam ? homeTeam.flag : '🏳️'}</span>
                            <span class="bracket-team-name">${homeTeam ? homeTeam.name : match.homeTeam}</span>
                        </div>
                        <span class="bracket-team-score">${match.homeScore !== null ? match.homeScore : '-'}</span>
                    </div>
                    <div class="bracket-vs">VS</div>
                    <div class="bracket-team ${match.winner === 'away' ? 'winner' : ''} ${!awayTeam ? 'empty' : ''}"
                         onclick="selectTeam('${match.id}', 'away', '${containerId}')"
                         data-side="away">
                        <div class="bracket-team-info">
                            <span class="bracket-team-flag">${awayTeam ? awayTeam.flag : '🏳️'}</span>
                            <span class="bracket-team-name">${awayTeam ? awayTeam.name : match.awayTeam}</span>
                        </div>
                        <span class="bracket-team-score">${match.awayScore !== null ? match.awayScore : '-'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 渲染决赛轮
function renderFinalRound(rounds) {
    const container = document.getElementById('finalRound');
    if (!container) return;

    const semiFinal1 = rounds.semiFinals[0];
    const semiFinal2 = rounds.semiFinals[1];
    const thirdPlace = rounds.thirdPlace;
    const final = rounds.final;

    // 获取球队信息
    const sf1Home = semiFinal1.homeTeamId ? getTeamById(semiFinal1.homeTeamId) : null;
    const sf1Away = semiFinal1.awayTeamId ? getTeamById(semiFinal1.awayTeamId) : null;
    const sf2Home = semiFinal2.homeTeamId ? getTeamById(semiFinal2.homeTeamId) : null;
    const sf2Away = semiFinal2.awayTeamId ? getTeamById(semiFinal2.awayTeamId) : null;

    const thirdHome = thirdPlace.homeTeamId ? getTeamById(thirdPlace.homeTeamId) : null;
    const thirdAway = thirdPlace.awayTeamId ? getTeamById(thirdPlace.awayTeamId) : null;
    const finalHome = final.homeTeamId ? getTeamById(final.homeTeamId) : null;
    const finalAway = final.awayTeamId ? getTeamById(final.awayTeamId) : null;

    container.innerHTML = `
        <div class="bracket-match bracket-final" data-match-id="SF-1">
            <div class="bracket-match-header">
                <span>半决赛 1</span>
                <span class="bracket-match-date">${semiFinal1.date} ${semiFinal1.time}</span>
            </div>
            <div class="bracket-teams">
                <div class="bracket-team ${semiFinal1.winner === 'home' ? 'winner' : ''}"
                     onclick="selectTeam('SF-1', 'home', 'semiFinals')"
                     data-side="home">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${sf1Home ? sf1Home.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${sf1Home ? sf1Home.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${semiFinal1.homeScore !== null ? semiFinal1.homeScore : '-'}</span>
                </div>
                <div class="bracket-vs">VS</div>
                <div class="bracket-team ${semiFinal1.winner === 'away' ? 'winner' : ''}"
                     onclick="selectTeam('SF-1', 'away', 'semiFinals')"
                     data-side="away">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${sf1Away ? sf1Away.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${sf1Away ? sf1Away.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${semiFinal1.awayScore !== null ? semiFinal1.awayScore : '-'}</span>
                </div>
            </div>
        </div>

        <div class="bracket-match bracket-final" data-match-id="SF-2">
            <div class="bracket-match-header">
                <span>半决赛 2</span>
                <span class="bracket-match-date">${semiFinal2.date} ${semiFinal2.time}</span>
            </div>
            <div class="bracket-teams">
                <div class="bracket-team ${semiFinal2.winner === 'home' ? 'winner' : ''}"
                     onclick="selectTeam('SF-2', 'home', 'semiFinals')"
                     data-side="home">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${sf2Home ? sf2Home.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${sf2Home ? sf2Home.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${semiFinal2.homeScore !== null ? semiFinal2.homeScore : '-'}</span>
                </div>
                <div class="bracket-vs">VS</div>
                <div class="bracket-team ${semiFinal2.winner === 'away' ? 'winner' : ''}"
                     onclick="selectTeam('SF-2', 'away', 'semiFinals')"
                     data-side="away">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${sf2Away ? sf2Away.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${sf2Away ? sf2Away.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${semiFinal2.awayScore !== null ? semiFinal2.awayScore : '-'}</span>
                </div>
            </div>
        </div>

        <div class="bracket-match" data-match-id="3RD">
            <div class="bracket-match-header">
                <span>🥉 三四名决赛</span>
                <span class="bracket-match-date">${thirdPlace.date} ${thirdPlace.time}</span>
            </div>
            <div class="bracket-teams">
                <div class="bracket-team ${thirdPlace.winner === 'home' ? 'winner' : ''}"
                     onclick="selectTeam('3RD', 'home', 'thirdPlace')"
                     data-side="home">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${thirdHome ? thirdHome.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${thirdHome ? thirdHome.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${thirdPlace.homeScore !== null ? thirdPlace.homeScore : '-'}</span>
                </div>
                <div class="bracket-vs">VS</div>
                <div class="bracket-team ${thirdPlace.winner === 'away' ? 'winner' : ''}"
                     onclick="selectTeam('3RD', 'away', 'thirdPlace')"
                     data-side="away">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${thirdAway ? thirdAway.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${thirdAway ? thirdAway.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${thirdPlace.awayScore !== null ? thirdPlace.awayScore : '-'}</span>
                </div>
            </div>
        </div>

        <div class="bracket-match bracket-final" data-match-id="FINAL" style="border: 2px solid #f59e0b;">
            <div class="bracket-match-header">
                <span>🏆 决赛</span>
                <span class="bracket-match-date">${final.date} ${final.time}</span>
            </div>
            <div class="bracket-teams">
                <div class="bracket-team ${final.winner === 'home' ? 'winner' : ''}"
                     onclick="selectTeam('FINAL', 'home', 'final')"
                     data-side="home">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${finalHome ? finalHome.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${finalHome ? finalHome.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${final.homeScore !== null ? final.homeScore : '-'}</span>
                </div>
                <div class="bracket-vs">VS</div>
                <div class="bracket-team ${final.winner === 'away' ? 'winner' : ''}"
                     onclick="selectTeam('FINAL', 'away', 'final')"
                     data-side="away">
                    <div class="bracket-team-info">
                        <span class="bracket-team-flag">${finalAway ? finalAway.flag : '🏳️'}</span>
                        <span class="bracket-team-name">${finalAway ? finalAway.name : '待定'}</span>
                    </div>
                    <span class="bracket-team-score">${final.awayScore !== null ? final.awayScore : '-'}</span>
                </div>
            </div>
        </div>
    `;
}

// 选择球队
function selectTeam(matchId, side, round) {
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

    // 检查是否已有球队
    if (!match.homeTeamId || !match.awayTeamId) {
        // 如果还没有球队，显示球队选择器
        showTeamPicker(matchId, side, round);
        return;
    }

    // 设置比分和获胜者
    const homeTeam = getTeamById(match.homeTeamId);
    const awayTeam = getTeamById(match.awayTeamId);

    // 弹出输入比分
    const homeScore = prompt(`输入 ${homeTeam.name} 的比分:`, match.homeScore || 0);
    if (homeScore === null) return;

    const awayScore = prompt(`输入 ${awayTeam.name} 的比分:`, match.awayScore || 0);
    if (awayScore === null) return;

    // 设置结果
    setMatchResult(round, matchId, parseInt(homeScore), parseInt(awayScore));

    // 重新加载对阵图
    loadBracket();
}

// 显示球队选择器
function showTeamPicker(matchId, side, round) {
    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'team-picker-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="team-picker-content">
            <div class="team-picker-header">
                <h3>选择球队</h3>
                <button class="team-picker-close" onclick="this.closest('.team-picker-modal').remove()">&times;</button>
            </div>
            <div class="team-picker-grid">
                ${Object.entries(getAllTeams()).map(([id, team]) => `
                    <div class="team-picker-item" onclick="pickTeam('${matchId}', '${side}', '${round}', '${id}')">
                        <span class="flag">${team.flag}</span>
                        <span class="name">${team.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// 选择球队
function pickTeam(matchId, side, round, teamId) {
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

    // 设置球队
    if (side === 'home') {
        match.homeTeamId = teamId;
    } else {
        match.awayTeamId = teamId;
    }

    // 关闭弹窗
    document.querySelector('.team-picker-modal')?.remove();

    // 重新加载对阵图
    loadBracket();
}

// 初始化控制按钮
function initBracketControls() {
    const resetBtn = document.getElementById('resetBracket');
    const saveBtn = document.getElementById('saveBracket');

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('确定要重置所有预测吗？')) {
                resetPredictions();
                loadBracket();
            }
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const predictions = getUserPredictions();
            localStorage.setItem('worldCupPredictions', JSON.stringify(predictions));
            alert('预测已保存！');
        });
    }
}

// 加载保存的预测
function loadSavedPredictions() {
    const saved = localStorage.getItem('worldCupPredictions');
    if (saved) {
        const predictions = JSON.parse(saved);
        // 这里可以添加恢复预测的逻辑
    }
}
