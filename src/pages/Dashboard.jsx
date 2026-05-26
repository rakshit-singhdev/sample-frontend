import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
} from 'react';

import { useNavigate } from 'react-router';
import api from '../utils/auth.js';

const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .deals-root {
        min-height: 100vh;
        background: #0f0f0f;
        font-family: 'DM Sans', sans-serif;
        color: #f5f0e8;
    }

    /* ── Header ── */

    .deals-header {
        border-bottom: 1px solid #1e1e1e;
        padding: 0 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        position: sticky;
        top: 0;
        background: #0f0f0f;
        z-index: 10;
    }

    .header-brand {
        font-family: 'DM Serif Display', serif;
        font-size: 13px;
        letter-spacing: 4px;
        text-transform: uppercase;
        color: #d4af37;
    }

    .header-user {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .user-avatar {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #d4af37;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 600;
        color: #0f0f0f;
        flex-shrink: 0;
    }

    .user-info {
        text-align: right;
    }

    .user-name {
        font-size: 13px;
        font-weight: 500;
        color: #f5f0e8;
        line-height: 1.2;
    }

    .user-role {
        font-size: 11px;
        color: #555;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .btn-logout {
        background: transparent;
        border: 1px solid #2a2a2a;
        color: #555;
        padding: 7px 14px;
        border-radius: 4px;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.2s;
        margin-left: 8px;
    }

    .btn-logout:hover {
        border-color: #555;
        color: #f5f0e8;
    }

    /* ── Page Content ── */

    .deals-body {
        padding: 40px;
        max-width: 1400px;
        margin: 0 auto;
    }

    .page-title {
        font-family: 'DM Serif Display', serif;
        font-size: 36px;
        color: #f5f0e8;
        margin-bottom: 4px;
    }

    .page-sub {
        font-size: 14px;
        color: #555;
        font-weight: 300;
        margin-bottom: 36px;
    }

    /* ── Summary Cards ── */

    .summary-row {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 36px;
    }

    .summary-card {
        background: #141414;
        border: 1px solid #1e1e1e;
        border-radius: 8px;
        padding: 20px 24px;
    }

    .summary-label {
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #555;
        margin-bottom: 10px;
    }

    .summary-value {
        font-family: 'DM Serif Display', serif;
        font-size: 28px;
        color: #d4af37;
    }

    /* ── Table ── */

    .table-wrap {
        background: #141414;
        border: 1px solid #1e1e1e;
        border-radius: 8px;
        overflow: hidden;
    }

    .table-header-row {
        padding: 16px 24px;
        border-bottom: 1px solid #1e1e1e;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .table-title {
        font-size: 13px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #555;
    }

    .count-badge {
        background: #1e1e1e;
        color: #888;
        font-size: 12px;
        padding: 4px 10px;
        border-radius: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    thead th {
        padding: 12px 20px;
        text-align: left;
        font-size: 11px;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #444;
        font-weight: 400;
        border-bottom: 1px solid #1e1e1e;
        white-space: nowrap;
    }

    tbody tr {
        border-bottom: 1px solid #1a1a1a;
        transition: background 0.15s;
    }

    tbody tr:last-child {
        border-bottom: none;
    }

    tbody tr:hover {
        background: #181818;
    }

    tbody td {
        padding: 14px 20px;
        font-size: 13px;
        color: #aaa;
        white-space: nowrap;
    }

    .td-name {
        color: #f5f0e8;
        font-weight: 500;
    }

    .stage-badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 11px;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    .stage-Prospect {
        background: rgba(212,175,55,0.12);
        color: #d4af37;
    }

    .stage-LOI {
        background: rgba(59,130,246,0.12);
        color: #60a5fa;
    }

    .stage-Under-Contract {
        background: rgba(16,185,129,0.12);
        color: #34d399;
    }

    .stage-Due-Deligence {
        background: rgba(249,115,22,0.12);
        color: #fb923c;
    }

    .stage-Analysing {
        background: rgba(139,92,246,0.12);
        color: #a78bfa;
    }

    .stage-Closed {
        background: rgba(34,197,94,0.12);
        color: #4ade80;
    }

    .stage-Dead {
        background: rgba(239,68,68,0.12);
        color: #f87171;
    }

    .td-value {
        color: #d4af37;
        font-family: 'DM Serif Display', serif;
        font-size: 15px;
    }

    /* ── States ── */

    .loading-state,
    .empty-state,
    .error-state {
        padding: 60px;
        text-align: center;
        color: #444;
        font-size: 14px;
    }

    .spinner {
        width: 24px;
        height: 24px;
        border: 2px solid #2a2a2a;
        border-top-color: #d4af37;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin: 0 auto 16px;
    }

    .all-loaded {
        font-size: 12px;
        color: #333;
        letter-spacing: 2px;
        text-transform: uppercase;
        padding: 20px;
        text-align: center;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    @media (max-width: 900px) {

        .deals-body {
            padding: 20px;
        }

        .summary-row {
            grid-template-columns: repeat(2, 1fr);
        }

        .deals-header {
            padding: 0 20px;
        }
    }
`;

const LIMIT = 10;

const fmt = (n) =>
    n != null
        ? '$' +
        Number(n).toLocaleString('en-US', {
            maximumFractionDigits: 0,
        })
        : '--';

const stageBadge = (stage) => {
    const cls = 'stage-' + (stage || '').replace(/\s+/g, '-');

    return (
        <span className={`stage-badge ${cls}`}>
            {stage || '--'}
        </span>
    );
};

const Dashboard = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const token = localStorage.getItem('accessToken');

    const [projects, setProjects] = useState([]);

    const [stats, setStats] = useState({
        count: 0,
        activeCount: 0,
        totalAcreage: 0,
        totalLots: 0,
        pipelineValue: 0,
    });

    const [cursor, setCursor] = useState(null);

    const [hasMore, setHasMore] = useState(true);

    const [loading, setLoading] = useState(false);

    const [initialLoad, setInitialLoad] = useState(true);

    const [error, setError] = useState('');

    const fetchingRef = useRef(false);

    const observer = useRef();

    const fetchDeals = useCallback(
        async (cursorVal = null) => {

            // Prevent duplicate requests
            if (fetchingRef.current) return;

            try {

                fetchingRef.current = true;

                setLoading(true);

                setError('');

                const params = {
                    limit: LIMIT,
                };

                if (cursorVal) {
                    params.cursor = cursorVal;
                }

                const res = await api.get(
                    '/api/project/deal',
                    { params }
                );

                const {
                    projects: newProjects = [],
                    nextCursor,
                    hasMore: more,
                } = res.data;

                // Check if cursor stopped advancing (pagination issue)
                const cursorNotAdvancing = cursorVal === nextCursor && newProjects.length > 0;
                if (cursorNotAdvancing) {
                    console.warn('Infinite scroll: Cursor not advancing - backend pagination may be broken');
                    setHasMore(false);
                    return;
                }

                setProjects((prev) => {

                    // Merge old + new
                    const merged = [...prev, ...newProjects];

                    // Remove duplicates
                    const unique = merged.filter(
                        (project, index, self) =>
                            index ===
                            self.findIndex(
                                (p) => p._id === project._id
                            )
                    );

                    return unique;
                });

                setCursor(nextCursor);

                setHasMore(more);

            } catch (err) {

                console.error(err);

                if (err.response?.status === 401) {
                    localStorage.clear();
                    navigate('/login');
                }

                setError(
                    err.response?.data?.message ||
                    'Failed to load deals'
                );

            } finally {

                fetchingRef.current = false;

                setLoading(false);

                setInitialLoad(false);
            }
        },
        [navigate]
    );

    const fetchStats = useCallback(async () => {
        try {

            const res = await api.get(
                '/api/project/deal-stats'
            );

            setStats(res.data.satstics || {});

        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {

        if (!token) {
            navigate('/login');
            return;
        }

        const initializeDashboard = async () => {
            await Promise.all([
                fetchDeals(),
                fetchStats(),
            ]);
        };

        initializeDashboard();

    }, [token, navigate, fetchDeals, fetchStats]);

    const lastProjectRef = useRef(null);

    useEffect(() => {
        if (!lastProjectRef.current) return;

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !fetchingRef.current) {
                    fetchDeals(cursor);
                }
            },
            { threshold: 0.1 }
        );

        observer.current.observe(lastProjectRef.current);

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [hasMore, cursor, fetchDeals]);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const initials = user.name
        ? user.name
            .split(' ')
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()
        : '?';

    return (
        <>
            <style>{styles}</style>

            <div className="deals-root">

                {/* Header */}

                <header className="deals-header">

                    <div className="header-brand">
                        Landstats
                    </div>

                    <div className="header-user">

                        <div className="user-info">

                            <div className="user-name">
                                {user.name || 'User'}
                            </div>

                            <div className="user-role">
                                {
                                    user.role
                                        ?.replace(/_/g, ' ') ||
                                    'Member'
                                }
                            </div>

                        </div>

                        <div className="user-avatar">
                            {initials}
                        </div>

                        <button
                            className="btn-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </header>

                <div className="deals-body">

                    <h1 className="page-title">
                        Deal Pipeline
                    </h1>

                    <p className="page-sub">
                        {user.name
                            ? `Welcome back, ${user.name.split(' ')[0]}.`
                            : ''}
                        {' '}
                        Here are your active projects.
                    </p>

                    {/* Summary Cards */}

                    <div className="summary-row">

                        <div className="summary-card">
                            <div className="summary-label">
                                Total Projects
                            </div>

                            <div className="summary-value">
                                {stats.count || 0}
                            </div>
                        </div>

                        <div className="summary-card">
                            <div className="summary-label">
                                Active Deals
                            </div>

                            <div className="summary-value">
                                {stats.activeCount || 0}
                            </div>
                        </div>

                        <div className="summary-card">
                            <div className="summary-label">
                                Pipeline Acreage
                            </div>

                            <div className="summary-value">
                                {(stats.totalAcreage || 0)
                                    .toLocaleString(
                                        'en-US',
                                        {
                                            maximumFractionDigits: 1,
                                        }
                                    )}
                            </div>
                        </div>

                        <div className="summary-card">
                            <div className="summary-label">
                                Pipeline Value
                            </div>

                            <div className="summary-value">
                                {fmt(stats.pipelineValue || 0)}
                            </div>
                        </div>

                    </div>

                    {/* Table */}

                    <div className="table-wrap">

                        <div className="table-header-row">

                            <span className="table-title">
                                Projects
                            </span>

                            <span className="count-badge">
                                {projects.length} loaded
                            </span>

                        </div>

                        {initialLoad ? (

                            <div className="loading-state">

                                <div className="spinner" />

                                Loading your deals...

                            </div>

                        ) : error ? (

                            <div className="error-state">
                                {error}
                            </div>

                        ) : projects.length === 0 ? (

                            <div className="empty-state">
                                No projects found.
                            </div>

                        ) : (

                            <table>

                                <thead>

                                    <tr>
                                        <th>Name</th>
                                        <th>Region</th>
                                        <th>Stage</th>
                                        <th>Acreage</th>
                                        <th>Lots</th>
                                        <th>Land Cost</th>
                                        <th>Sale Potential</th>
                                        <th>Zoning</th>
                                        <th>Rezoning %</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {projects.map((p, index) => {

                                        const isLast =
                                            index ===
                                            projects.length - 1;

                                        return (

                                            <tr
                                                key={p._id}
                                                ref={
                                                    isLast
                                                        ? lastProjectRef
                                                        : null
                                                }
                                            >

                                                <td className="td-name">
                                                    {p.name}
                                                </td>

                                                <td>
                                                    {p.region || '--'}
                                                </td>

                                                <td>
                                                    {stageBadge(
                                                        p.projectStage
                                                    )}
                                                </td>

                                                <td>
                                                    {p.acreage}
                                                </td>

                                                <td>
                                                    {p.lots_units}
                                                </td>

                                                <td className="td-value">
                                                    {fmt(
                                                        p.totalCost
                                                    )}
                                                </td>

                                                <td className="td-value">
                                                    {fmt(
                                                        p.potential
                                                    )}
                                                </td>

                                                <td>
                                                    {
                                                        p.current_zoning ||
                                                        '--'
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        p.rezoning_probability_pct !=
                                                            null
                                                            ? `${p.rezoning_probability_pct}%`
                                                            : '--'
                                                    }
                                                </td>

                                            </tr>
                                        );
                                    })}

                                </tbody>

                            </table>
                        )}

                        {loading && !initialLoad && (

                            <div className="loading-state">

                                <div className="spinner" />

                                Loading more deals...

                            </div>
                        )}

                        {!hasMore &&
                            projects.length > 0 && (

                                <div className="all-loaded">
                                    All projects loaded
                                </div>
                            )}

                    </div>

                </div>

            </div>
        </>
    );
};

export default Dashboard;