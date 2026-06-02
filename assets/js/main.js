const root = document.documentElement;
const key = "encanta-theme";
const toggle = document.querySelector("[data-theme-toggle]");

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const sync = (value) => {
  root.dataset.theme = value;
  if (toggle) {
    const effectiveTheme = value === "system" ? getSystemTheme() : value;
    toggle.dataset.theme = effectiveTheme;
    toggle.setAttribute(
      "aria-label",
      effectiveTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    toggle.setAttribute(
      "title",
      effectiveTheme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
};

const saved = localStorage.getItem(key) || "system";
sync(saved);

if (toggle) {
  const saved = localStorage.getItem(key) || "system";
  toggle.addEventListener("click", () => {
    const current = root.dataset.theme || saved;
    const effectiveCurrent = current === "system" ? getSystemTheme() : current;
    const next = effectiveCurrent === "dark" ? "light" : "dark";
    localStorage.setItem(key, next);
    sync(next);
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = () => {
    if ((localStorage.getItem(key) || "system") === "system") {
      sync("system");
    }
  };

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", handleSystemChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(handleSystemChange);
  }
}

const getCodeLanguage = (block) => {
  const code = block.querySelector("code");
  if (!code) return "text";

  const dataLang = code.dataset.lang;
  if (dataLang) return dataLang;

  const classMatch = Array.from(code.classList)
    .map((name) => name.match(/^language-(.+)$/))
    .find(Boolean);

  return classMatch ? classMatch[1] : "text";
};

const createCodeButton = (options) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-block-button";
  button.innerHTML = options.icon;
  button.setAttribute("aria-label", options.label);
  button.setAttribute("title", options.label);
  button.addEventListener("click", options.action);
  return button;
};

const setCodeButtonFeedback = (button, state) => {
  button.dataset.state = state;
};

let toastTimeoutId = null;

const ensureToast = () => {
  let toast = document.querySelector("[data-ui-toast]");
  if (toast) return toast;

  toast = document.createElement("div");
  toast.className = "ui-toast";
  toast.dataset.uiToast = "true";
  toast.setAttribute("aria-live", "polite");
  toast.setAttribute("aria-atomic", "true");
  document.body.appendChild(toast);
  return toast;
};

const showToast = (message, state = "info") => {
  const toast = ensureToast();
  toast.textContent = message;
  toast.dataset.state = state;
  toast.dataset.visible = "true";

  if (toastTimeoutId) {
    window.clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = window.setTimeout(() => {
    toast.dataset.visible = "false";
  }, 1600);
};

const enhanceCodeBlocks = () => {
  document.querySelectorAll(".article-body pre").forEach((pre) => {
    const sourceBlock = pre.parentElement?.classList.contains("highlight")
      ? pre.parentElement
      : pre;

    if (sourceBlock.dataset.enhanced === "true") return;
    sourceBlock.dataset.enhanced = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "code-block";
    sourceBlock.parentNode.insertBefore(wrapper, sourceBlock);
    const body = document.createElement("div");
    body.className = "code-block-body";
    wrapper.appendChild(body);
    body.appendChild(sourceBlock);

    const toolbar = document.createElement("div");
    toolbar.className = "code-block-toolbar";

    const language = document.createElement("span");
    language.className = "code-block-language";
    language.textContent = getCodeLanguage(sourceBlock);
    toolbar.appendChild(language);

    const actions = document.createElement("div");
    actions.className = "code-block-actions";

    const copyButton = createCodeButton({
      label: "复制代码",
      icon:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="10" height="10" rx="2"></rect><rect x="5" y="5" width="10" height="10" rx="2"></rect></svg>',
      action: async () => {
      const code = sourceBlock.querySelector("code");
      const text = code ? code.textContent || "" : pre.textContent || "";

      try {
        await navigator.clipboard.writeText(text);
        setCodeButtonFeedback(copyButton, "success");
        copyButton.setAttribute("aria-label", "已复制");
        copyButton.setAttribute("title", "已复制");
        showToast("代码已复制", "success");
        window.setTimeout(() => {
          setCodeButtonFeedback(copyButton, "idle");
          copyButton.setAttribute("aria-label", "复制代码");
          copyButton.setAttribute("title", "复制代码");
        }, 1500);
      } catch {
        setCodeButtonFeedback(copyButton, "error");
        copyButton.setAttribute("aria-label", "复制失败");
        copyButton.setAttribute("title", "复制失败");
        showToast("复制失败", "error");
        window.setTimeout(() => {
          setCodeButtonFeedback(copyButton, "idle");
          copyButton.setAttribute("aria-label", "复制代码");
          copyButton.setAttribute("title", "复制代码");
        }, 1500);
      }
      },
    });
    setCodeButtonFeedback(copyButton, "idle");
    actions.appendChild(copyButton);

    const lineCount = (pre.textContent || "").split("\n").length;
    if (lineCount > 14) {
      wrapper.dataset.collapsed = "true";
      const updateToggleLabel = (button, collapsed) => {
        const label = collapsed ? "展开代码" : "收起代码";
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
      };
      const toggleButton = createCodeButton({
        label: "展开代码",
        icon:
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>',
        action: () => {
          const collapsed = wrapper.dataset.collapsed === "true";
          wrapper.dataset.collapsed = collapsed ? "false" : "true";
          updateToggleLabel(toggleButton, !collapsed);
        },
      });
      updateToggleLabel(toggleButton, true);
      actions.appendChild(toggleButton);
    }

    toolbar.appendChild(actions);
    wrapper.insertBefore(toolbar, body);
  });
};

const enhanceIframes = () => {
  document.querySelectorAll(".article-body iframe").forEach((iframe) => {
    if (iframe.closest(".embed-frame")) return;

    const src = iframe.getAttribute("src") || "";
    const normalizedSrc = src.startsWith("//") ? `https:${src}` : src;

    const wrapper = document.createElement("figure");
    wrapper.className = "embed-frame";

    if (/music\.163\.com/.test(normalizedSrc)) {
      wrapper.classList.add("embed-frame-music");
    } else if (/acfun\.cn\/player/.test(normalizedSrc)) {
      wrapper.classList.add("embed-frame-video");
    } else {
      wrapper.classList.add("embed-frame-generic");
    }

    iframe.parentNode.insertBefore(wrapper, iframe);
    wrapper.appendChild(iframe);

    iframe.removeAttribute("style");
    iframe.setAttribute("loading", "lazy");
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");

    if (wrapper.classList.contains("embed-frame-music")) {
      iframe.setAttribute("height", iframe.getAttribute("height") || "96");
    } else if (wrapper.classList.contains("embed-frame-video")) {
      iframe.setAttribute("allowfullscreen", "allowfullscreen");
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      enhanceCodeBlocks();
      enhanceIframes();
    },
    { once: true }
  );
} else {
  enhanceCodeBlocks();
  enhanceIframes();
}
