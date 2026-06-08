// 2026世界杯完整赛程数据
const tournamentData = {
    // 小组赛出线规则：每组前2名直接出线，共24队；另8个最佳第三名出线，共32队进入淘汰赛
    knockoutRounds: {
        // 16强
        roundOf32: [
            {
                id: "R32-1",
                match: 1,
                date: "2026-06-28",
                time: "16:00",
                venue: "纽约",
                homeTeam: "1A",  // A组第1名
                awayTeam: "2B",  // B组第2名
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-2",
                match: 2,
                date: "2026-06-28",
                time: "20:00",
                venue: "洛杉矶",
                homeTeam: "1C",
                awayTeam: "2D",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-3",
                match: 3,
                date: "2026-06-29",
                time: "16:00",
                venue: "休斯顿",
                homeTeam: "1E",
                awayTeam: "2F",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-4",
                match: 4,
                date: "2026-06-29",
                time: "20:00",
                venue: "达拉斯",
                homeTeam: "1G",
                awayTeam: "2H",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-5",
                match: 5,
                date: "2026-06-30",
                time: "16:00",
                venue: "迈阿密",
                homeTeam: "1I",
                awayTeam: "2J",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-6",
                match: 6,
                date: "2026-06-30",
                time: "20:00",
                venue: "亚特兰大",
                homeTeam: "1K",
                awayTeam: "2L",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-7",
                match: 7,
                date: "2026-07-01",
                time: "16:00",
                venue: "波士顿",
                homeTeam: "1B",
                awayTeam: "2A",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-8",
                match: 8,
                date: "2026-07-01",
                time: "20:00",
                venue: "旧金山",
                homeTeam: "1D",
                awayTeam: "2C",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-9",
                match: 9,
                date: "2026-07-02",
                time: "16:00",
                venue: "温哥华",
                homeTeam: "1F",
                awayTeam: "2E",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-10",
                match: 10,
                date: "2026-07-02",
                time: "20:00",
                venue: "多伦多",
                homeTeam: "1H",
                awayTeam: "2G",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-11",
                match: 11,
                date: "2026-07-03",
                time: "16:00",
                venue: "西雅图",
                homeTeam: "1J",
                awayTeam: "2I",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-12",
                match: 12,
                date: "2026-07-03",
                time: "20:00",
                venue: "费城",
                homeTeam: "1L",
                awayTeam: "2K",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-13",
                match: 13,
                date: "2026-07-04",
                time: "16:00",
                venue: "休斯顿",
                homeTeam: "3A",
                awayTeam: "3B",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-14",
                match: 14,
                date: "2026-07-04",
                time: "20:00",
                venue: "达拉斯",
                homeTeam: "3C",
                awayTeam: "3D",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-15",
                match: 15,
                date: "2026-07-05",
                time: "16:00",
                venue: "迈阿密",
                homeTeam: "3E",
                awayTeam: "3F",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            },
            {
                id: "R32-16",
                match: 16,
                date: "2026-07-05",
                time: "20:00",
                venue: "亚特兰大",
                homeTeam: "3G",
                awayTeam: "3H",
                homeTeamId: null,
                awayTeamId: null,
                homeScore: null,
                awayScore: null,
                winner: null,
                status: "upcoming"
            }
        ],

        // 16强（实际是32强后的16强）
        roundOf16: [
            { id: "R16-1", match: 1, date: "2026-07-06", time: "16:00", venue: "纽约", homeTeam: "W1", awayTeam: "W2", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-2", match: 2, date: "2026-07-06", time: "20:00", venue: "洛杉矶", homeTeam: "W3", awayTeam: "W4", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-3", match: 3, date: "2026-07-07", time: "16:00", venue: "休斯顿", homeTeam: "W5", awayTeam: "W6", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-4", match: 4, date: "2026-07-07", time: "20:00", venue: "达拉斯", homeTeam: "W7", awayTeam: "W8", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-5", match: 5, date: "2026-07-08", time: "16:00", venue: "迈阿密", homeTeam: "W9", awayTeam: "W10", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-6", match: 6, date: "2026-07-08", time: "20:00", venue: "亚特兰大", homeTeam: "W11", awayTeam: "W12", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-7", match: 7, date: "2026-07-09", time: "16:00", venue: "波士顿", homeTeam: "W13", awayTeam: "W14", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "R16-8", match: 8, date: "2026-07-09", time: "20:00", venue: "旧金山", homeTeam: "W15", awayTeam: "W16", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" }
        ],

        // 8强（四分之一决赛）
        quarterFinals: [
            { id: "QF-1", match: 1, date: "2026-07-11", time: "16:00", venue: "纽约", homeTeam: "WR16-1", awayTeam: "WR16-2", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "QF-2", match: 2, date: "2026-07-11", time: "20:00", venue: "洛杉矶", homeTeam: "WR16-3", awayTeam: "WR16-4", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "QF-3", match: 3, date: "2026-07-12", time: "16:00", venue: "休斯顿", homeTeam: "WR16-5", awayTeam: "WR16-6", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "QF-4", match: 4, date: "2026-07-12", time: "20:00", venue: "达拉斯", homeTeam: "WR16-7", awayTeam: "WR16-8", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" }
        ],

        // 半决赛
        semiFinals: [
            { id: "SF-1", match: 1, date: "2026-07-14", time: "20:00", venue: "纽约", homeTeam: "WQF-1", awayTeam: "WQF-2", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" },
            { id: "SF-2", match: 2, date: "2026-07-15", time: "20:00", venue: "洛杉矶", homeTeam: "WQF-3", awayTeam: "WQF-4", homeTeamId: null, awayTeamId: null, homeScore: null, awayScore: null, winner: null, status: "upcoming" }
        ],

        // 三四名决赛
        thirdPlace: {
            id: "3RD",
            date: "2026-07-18",
            time: "16:00",
            venue: "迈阿密",
            homeTeam: "LSF-1",
            awayTeam: "LSF-2",
            homeTeamId: null,
            awayTeamId: null,
            homeScore: null,
            awayScore: null,
            winner: null,
            status: "upcoming"
        },

        // 决赛
        final: {
            id: "FINAL",
            date: "2026-07-19",
            time: "18:00",
            venue: "纽约 大都会人寿体育场",
            homeTeam: "WSF-1",
            awayTeam: "WSF-2",
            homeTeamId: null,
            awayTeamId: null,
            homeScore: null,
            awayScore: null,
            winner: null,
            status: "upcoming"
        }
    },

    // 用户预测数据
    userPredictions: {}
};

// 获取淘汰赛数据
function getKnockoutRounds() {
    return tournamentData.knockoutRounds;
}

// 设置比赛结果
function setMatchResult(round, matchId, homeScore, awayScore) {
    const rounds = tournamentData.knockoutRounds;

    let match = null;
    if (round === 'roundOf32') match = rounds.roundOf32.find(m => m.id === matchId);
    else if (round === 'roundOf16') match = rounds.roundOf16.find(m => m.id === matchId);
    else if (round === 'quarterFinals') match = rounds.quarterFinals.find(m => m.id === matchId);
    else if (round === 'semiFinals') match = rounds.semiFinals.find(m => m.id === matchId);
    else if (round === 'thirdPlace') match = rounds.thirdPlace.id === matchId ? rounds.thirdPlace : null;
    else if (round === 'final') match = rounds.final.id === matchId ? rounds.final : null;

    if (match) {
        match.homeScore = homeScore;
        match.awayScore = awayScore;
        match.winner = homeScore > awayScore ? 'home' : 'away';
        match.status = 'completed';

        // 保存用户预测
        tournamentData.userPredictions[matchId] = {
            homeScore,
            awayScore,
            winner: match.winner
        };

        // 自动晋级到下一轮
        advanceTeam(round, matchId, match.winner === 'home' ? match.homeTeamId : match.awayTeamId);
    }
}

// 自动晋级
function advanceTeam(round, matchId, teamId) {
    const rounds = tournamentData.knockoutRounds;

    // 根据当前轮次，设置下一轮的球队
    if (round === 'roundOf32') {
        const matchIndex = rounds.roundOf32.findIndex(m => m.id === matchId);
        const nextMatchIndex = Math.floor(matchIndex / 2);
        const isHome = matchIndex % 2 === 0;

        if (nextMatchIndex < rounds.roundOf16.length) {
            if (isHome) {
                rounds.roundOf16[nextMatchIndex].homeTeamId = teamId;
            } else {
                rounds.roundOf16[nextMatchIndex].awayTeamId = teamId;
            }
        }
    } else if (round === 'roundOf16') {
        const matchIndex = rounds.roundOf16.findIndex(m => m.id === matchId);
        const nextMatchIndex = Math.floor(matchIndex / 2);
        const isHome = matchIndex % 2 === 0;

        if (nextMatchIndex < rounds.quarterFinals.length) {
            if (isHome) {
                rounds.quarterFinals[nextMatchIndex].homeTeamId = teamId;
            } else {
                rounds.quarterFinals[nextMatchIndex].awayTeamId = teamId;
            }
        }
    } else if (round === 'quarterFinals') {
        const matchIndex = rounds.quarterFinals.findIndex(m => m.id === matchId);
        const nextMatchIndex = Math.floor(matchIndex / 2);
        const isHome = matchIndex % 2 === 0;

        if (nextMatchIndex < rounds.semiFinals.length) {
            if (isHome) {
                rounds.semiFinals[nextMatchIndex].homeTeamId = teamId;
            } else {
                rounds.semiFinals[nextMatchIndex].awayTeamId = teamId;
            }
        }
    } else if (round === 'semiFinals') {
        const matchIndex = rounds.semiFinals.findIndex(m => m.id === matchId);

        if (matchIndex === 0) {
            rounds.final.homeTeamId = teamId;
            rounds.thirdPlace.homeTeamId = rounds.semiFinals[0].winner === 'home' ?
                rounds.semiFinals[0].awayTeamId : rounds.semiFinals[0].homeTeamId;
        } else {
            rounds.final.awayTeamId = teamId;
            rounds.thirdPlace.awayTeamId = rounds.semiFinals[1].winner === 'home' ?
                rounds.semiFinals[1].awayTeamId : rounds.semiFinals[1].homeTeamId;
        }
    }
}

// 获取用户预测
function getUserPredictions() {
    return tournamentData.userPredictions;
}

// 重置所有预测
function resetPredictions() {
    const rounds = tournamentData.knockoutRounds;

    // 重置所有比赛
    [...rounds.roundOf32, ...rounds.roundOf16, ...rounds.quarterFinals, ...rounds.semiFinals].forEach(match => {
        match.homeTeamId = null;
        match.awayTeamId = null;
        match.homeScore = null;
        match.awayScore = null;
        match.winner = null;
        match.status = 'upcoming';
    });

    rounds.thirdPlace.homeTeamId = null;
    rounds.thirdPlace.awayTeamId = null;
    rounds.thirdPlace.homeScore = null;
    rounds.thirdPlace.awayScore = null;
    rounds.thirdPlace.winner = null;
    rounds.thirdPlace.status = 'upcoming';

    rounds.final.homeTeamId = null;
    rounds.final.awayTeamId = null;
    rounds.final.homeScore = null;
    rounds.final.awayScore = null;
    rounds.final.winner = null;
    rounds.final.status = 'upcoming';

    tournamentData.userPredictions = {};
}
