// ==================== Forum Functionality ====================

document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const newQuestionBtn = document.getElementById('newQuestionBtn');
    const firstReplyBtn = document.getElementById('firstReplyBtn');
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
    firstReplyBtn?.addEventListener('click', openModal);
    closeModalBtn?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', closeModal);

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeModal();
        }
    });

    // Like functionality for thread detail
    const threadLikeBtn = document.querySelector('.forum-thread__stat--like');
    if (threadLikeBtn) {
        threadLikeBtn.addEventListener('click', function() {
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

    // Like functionality for thread item in forum detail page
    const threadItemLikeBtn = document.querySelector('.forum-thread-item__stat--like');
    if (threadItemLikeBtn) {
        threadItemLikeBtn.addEventListener('click', function() {
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

    // Like functionality for replies
    const replyLikeBtns = document.querySelectorAll('.forum-reply__action--like');
    replyLikeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const likeCount = this.querySelector('span');
            if (likeCount) {
                const currentCount = parseInt(likeCount.textContent);
                likeCount.textContent = this.classList.contains('active') 
                    ? currentCount + 1 
                    : currentCount - 1;
            }
        });
    });

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

    // Reply button functionality
    const replyButtons = document.querySelectorAll('.forum-reply__action:not(.forum-reply__action--like)');
    replyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const replyForm = document.querySelector('.forum-comment-form');
            if (replyForm) {
                replyForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const textarea = replyForm.querySelector('textarea');
                setTimeout(() => {
                    textarea?.focus();
                }, 500);
            }
        });
    });

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.forum-filters__tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
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

    tagTrigger?.addEventListener('click', function(e) {
        e.stopPropagation();
        tagMultiselect.classList.toggle('active');
        this.setAttribute('aria-expanded', tagMultiselect.classList.contains('active'));
    });

    document.addEventListener('click', function(e) {
        if (tagMultiselect && !tagMultiselect.contains(e.target)) {
            tagMultiselect.classList.remove('active');
            tagTrigger?.setAttribute('aria-expanded', 'false');
        }
    });

    tagMultiOptions.forEach(option => {
        option.addEventListener('click', function() {
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
});
