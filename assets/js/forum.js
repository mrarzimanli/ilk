// ==================== Forum Functionality ====================

document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const newQuestionBtn = document.getElementById('newQuestionBtn');
    const modal = document.getElementById('newQuestionModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalOverlay = modal?.querySelector('.modal__overlay');

    // Open modal
    const openModal = () => {
        modal?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close modal
    const closeModal = () => {
        modal?.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners for modal
    newQuestionBtn?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Like functionality for thread item
    const threadItemLikeBtn = document.querySelector('.forum-thread-item__stat--like');
    if (threadItemLikeBtn) {
        threadItemLikeBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            const likeCount = this.querySelector('span');
            if (likeCount) {
                const currentCount = parseInt(likeCount.textContent);
                likeCount.textContent = this.classList.contains('active')
                    ? currentCount + 1
                    : currentCount - 1;
            }
        });
    }

    // Form submission handlers (prevent default for demo)
    const replyForm = document.querySelector('.forum-comment-form__form');
    if (replyForm) {
        replyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Cavabınız backend-ə göndəriləcək (PHP)');
            // In production, this would send data to PHP backend
        });
    }

    const newQuestionForm = document.querySelector('.forum-new-question-form');
    if (newQuestionForm) {
        newQuestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Sualınız backend-ə göndəriləcək (PHP)');
            closeModal();
            // In production, this would send data to PHP backend
        });
    }

    // ── Forum filters collapse (mobile) ──────────────────────────────────────
    const filtersCollapseBtn = document.getElementById('filtersCollapseBtn');
    const forumFiltersEl     = document.getElementById('forumFiltersWrapper');
    const filtersActiveIcon  = forumFiltersEl?.querySelector('.forum-filters__active-icon');
    const filtersActiveLabel = forumFiltersEl?.querySelector('.forum-filters__active-label');

    filtersCollapseBtn?.addEventListener('click', () => {
        const isOpen = forumFiltersEl?.classList.toggle('open');
        filtersCollapseBtn.setAttribute('aria-expanded', String(!!isOpen));
    });

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.forum-filters__tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Update mobile header icon & label to match selected filter
            const iconClass = this.dataset.icon;
            const label     = this.dataset.label;
            if (filtersActiveIcon && iconClass) {
                filtersActiveIcon.className = `forum-filters__active-icon ${iconClass}`;
            }
            if (filtersActiveLabel && label) {
                filtersActiveLabel.textContent = label;
            }

            // Collapse filters on mobile after selection
            forumFiltersEl?.classList.remove('open');
            filtersCollapseBtn?.setAttribute('aria-expanded', 'false');

            // In production, this would trigger filtering/sorting via PHP backend
            console.log('Filter changed:', this.textContent.trim());
        });
    });

    // Tag multiselect dropdown functionality
    const tagMultiselect = document.getElementById('tagMultiselect');
    const tagTrigger = document.getElementById('tagTrigger');
    const tagMultiOptions = document.querySelectorAll('.tag-multiselect__option');
    const selectedTagsContainer = document.getElementById('selectedTags');
    const selectedTags = new Set();
    const MAX_TAGS = 5;

    tagTrigger?.addEventListener('click', function (e) {
        e.stopPropagation();
        tagMultiselect.classList.toggle('active');
        this.setAttribute('aria-expanded', tagMultiselect.classList.contains('active'));
    });

    document.addEventListener('click', function (e) {
        if (tagMultiselect && !tagMultiselect.contains(e.target)) {
            tagMultiselect.classList.remove('active');
            tagTrigger?.setAttribute('aria-expanded', 'false');
        }
    });

    tagMultiOptions.forEach(option => {
        option.addEventListener('click', function () {
            const tagValue = this.getAttribute('data-tag');
            const tagLabel = this.querySelector('span:last-child').textContent.trim();

            if (selectedTags.has(tagValue)) {
                selectedTags.delete(tagValue);
                this.classList.remove('selected');
                removeTagFromUI(tagValue);
            } else {
                if (selectedTags.size < MAX_TAGS) {
                    selectedTags.add(tagValue);
                    this.classList.add('selected');
                    addTagToUI(tagValue, tagLabel);
                }
            }
            updateTriggerText();
        });
    });

    function updateTriggerText() {
        const placeholder = tagTrigger?.querySelector('.tag-multiselect__placeholder');
        if (!placeholder) return;
        if (selectedTags.size === 0) {
            placeholder.textContent = 'Etiket seçin';
            placeholder.classList.remove('tag-multiselect__placeholder--active');
        } else {
            placeholder.textContent = `${selectedTags.size} etiket seçildi`;
            placeholder.classList.add('tag-multiselect__placeholder--active');
        }
    }

    function addTagToUI(value, label) {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-selector__selected-tag';
        tagElement.setAttribute('data-tag-value', value);
        tagElement.innerHTML = `
            <span>${label}</span>
            <button type="button" aria-label="Sil">
                <i class="ri-close-line"></i>
            </button>
        `;
        const removeBtn = tagElement.querySelector('button');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedTags.delete(value);
            removeTagFromUI(value);
            const opt = tagMultiselect?.querySelector(`.tag-multiselect__option[data-tag="${value}"]`);
            opt?.classList.remove('selected');
            updateTriggerText();
        });
        selectedTagsContainer?.appendChild(tagElement);
    }

    function removeTagFromUI(value) {
        const tagElement = selectedTagsContainer?.querySelector(`[data-tag-value="${value}"]`);
        tagElement?.remove();
    }

    // ── Forum Search ──────────────────────────────────────────────────────────
    const searchInput     = document.getElementById('forumSearchInput');
    const searchClear     = document.getElementById('forumSearchClear');
    const threadList      = document.getElementById('forumThreadList');
    const emptyState      = document.getElementById('forumEmptyState');
    const emptyStateQuery = document.getElementById('forumEmptyStateQuery');
    const pagination      = threadList?.parentElement?.querySelector('.pagination');

    const performSearch = (raw) => {
        const q = raw.trim().toLowerCase();

        // Toggle clear button
        searchClear?.classList.toggle('visible', q.length > 0);

        // Filter threads
        const items = threadList?.querySelectorAll('.forum-thread-item') ?? [];
        let visible = 0;

        items.forEach(item => {
            const title   = item.querySelector('.forum-thread-item__title')?.textContent.toLowerCase()       ?? '';
            const excerpt = item.querySelector('.forum-thread-item__excerpt')?.textContent.toLowerCase()     ?? '';
            const author  = item.querySelector('.forum-thread-item__author-name')?.textContent.toLowerCase() ?? '';
            const tags    = Array.from(item.querySelectorAll('.forum-thread-item__tag'))
                                .map(t => t.textContent.toLowerCase()).join(' ');

            const match = !q || title.includes(q) || excerpt.includes(q) || author.includes(q) || tags.includes(q);
            item.style.display = match ? '' : 'none';
            if (match) visible++;
        });

        // Empty state
        const noResults = visible === 0 && q.length > 0;
        emptyState?.classList.toggle('visible', noResults);
        if (emptyStateQuery) {
            emptyStateQuery.innerHTML = noResults
                ? `"<mark>${raw.trim()}</mark>" üçün heç bir nəticə tapılmadı`
                : '';
        }

        // Hide pagination while searching
        if (pagination) pagination.style.display = q ? 'none' : '';
    };

    let searchTimer;
    searchInput?.addEventListener('input', function () {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => performSearch(this.value), 220);
    });

    searchClear?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        performSearch('');
        searchInput?.focus();
    });

    // Clear search on Escape when input is focused
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchInput.value) {
            searchInput.value = '';
            performSearch('');
        }
    });

    // ── Mobile Sidebar Drawer ──────────────────────────────────────────────────
    const sidebarToggle  = document.getElementById('sidebarToggle');
    const forumSidebar   = document.getElementById('forumSidebar');
    const sidebarClose   = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('forumSidebarOverlay');

    const openSidebar = () => {
        forumSidebar?.classList.add('open');
        sidebarOverlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
        forumSidebar?.classList.remove('open');
        sidebarOverlay?.classList.remove('active');
        document.body.style.overflow = '';
    };

    sidebarToggle?.addEventListener('click', openSidebar);
    sidebarClose?.addEventListener('click', closeSidebar);
    sidebarOverlay?.addEventListener('click', closeSidebar);

    // Close sidebar on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && forumSidebar?.classList.contains('open')) {
            closeSidebar();
        }
    });

    // ── Sidebar widget collapsible (inside drawer) ─────────────────────────────
    document.querySelectorAll('.forum-layout__sidebar .sidebar-widget__title').forEach(title => {
        title.addEventListener('click', () => {
            const widget = title.closest('.sidebar-widget');
            if (widget) {
                // Close other open widgets (accordion behaviour)
                document.querySelectorAll('.forum-layout__sidebar .sidebar-widget.open').forEach(w => {
                    if (w !== widget) w.classList.remove('open');
                });
                widget.classList.toggle('open');
            }
        });
    });
});
