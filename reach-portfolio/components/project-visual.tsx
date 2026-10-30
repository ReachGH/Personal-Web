import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCheck,
  Circle,
  FileText,
  Leaf,
  Network,
  Server,
  ShieldCheck,
  ShoppingBasket,
  Terminal,
  Upload,
} from "lucide-react";
import type { ProjectSlug } from "@/data/projects";

function OnboardVisual() {
  return (
    <div className="onboard-scene">
      <div className="scene-grid" />
      <div className="onboard-window">
        <div className="window-top">
          <span className="mini-logo">
            <span /> onboard<span>hq</span>
          </span>
          <span className="window-dots">•••</span>
        </div>
        <div className="onboard-window-body">
          <div className="mock-sidebar">
            <span className="mock-nav-active">
              <Network size={12} /> Overview
            </span>
            <span>
              <CheckCheck size={12} /> Tasks
            </span>
            <span>
              <FileText size={12} /> Documents
            </span>
            <div className="sidebar-line" />
            <span className="mock-sidebar-bottom">WORKSPACE / DEMO</span>
          </div>
          <div className="mock-dashboard">
            <div className="mock-eyebrow">CLIENT WORKSPACE</div>
            <div className="mock-title">A clear path forward.</div>
            <div className="mock-subtitle">
              Everything you need to get started, in one place.
            </div>
            <div className="mock-progress">
              <span>Onboarding progress</span>
              <strong>Step 2 of 3</strong>
              <div>
                <i />
              </div>
            </div>
            <div className="mock-task">
              <span className="mock-check done">
                <Check size={12} />
              </span>
              <span>
                Welcome & introduction<small>Completed</small>
              </span>
              <span className="mock-task-label">Done</span>
            </div>
            <div className="mock-task">
              <span className="mock-check current">
                <Upload size={12} />
              </span>
              <span>
                Share your documents<small>Your next step</small>
              </span>
              <ArrowRight size={13} />
            </div>
            <div className="mock-task">
              <span className="mock-check">
                <Circle size={11} />
              </span>
              <span>
                Ready to get started<small>Coming up next</small>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="sync-note">
        <span>
          <CheckCheck size={16} />
        </span>
        <div>
          Connected, not duplicated.<small>Onboarding ↔ CRM</small>
        </div>
      </div>
      <span className="scene-caption">A SHARED VIEW. A CLEAR NEXT STEP.</span>
    </div>
  );
}

function GroceryVisual() {
  return (
    <div className="grocery-scene">
      <div className="grocery-orbit" />
      <div className="grocery-type">
        fresh
        <br />
        <span>thinking.</span>
      </div>
      <Leaf className="floating-leaf" size={46} strokeWidth={1} />
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-content">
          <div className="phone-top">
            <span>9:41</span>
            <span>••• ▰</span>
          </div>
          <div className="grocery-brand">
            <Leaf size={17} /> farm & basket
          </div>
          <small className="grocery-greeting">GOOD THINGS, GROWN LOCALLY</small>
          <div className="phone-heading">
            Fresh from
            <br />
            the farm.
          </div>
          <div className="produce-banner">
            <span className="produce produce-tomato" />
            <span className="produce produce-leaf" />
            <span className="produce produce-carrot" />
            <span className="produce produce-tomato small-tomato" />
            <span className="produce-banner-text">
              A little closer
              <br />
              to the source.
            </span>
          </div>
          <div className="phone-products-heading">
            In season <span>Fresh picks</span>
          </div>
          <div className="phone-products">
            <div>
              <span className="product-illustration">
                <span className="tiny-tomato" />
              </span>
              <strong>Vine tomatoes</strong>
              <small>From local growers</small>
            </div>
            <div>
              <span className="product-illustration pale">
                <span className="tiny-carrot" />
              </span>
              <strong>Garden carrots</strong>
              <small>Freshly harvested</small>
            </div>
          </div>
          <div className="phone-bottom">
            <ShoppingBasket size={16} />
            <span>Discover</span>
            <Leaf size={16} />
          </div>
        </div>
      </div>
      <div className="farm-note">
        <Leaf size={15} />
        <span>
          Built around
          <br />
          <strong>real people.</strong>
        </span>
      </div>
      <span className="scene-caption">
        MARKETPLACE CONCEPT / NOT A LIVE PRODUCT
      </span>
    </div>
  );
}

function InfrastructureVisual() {
  return (
    <div className="infra-scene">
      <div className="infra-grid" />
      <div className="infra-topline">
        <Terminal size={14} />
        <span>the things behind the screen</span>
        <span className="infra-green-dot" />
      </div>
      <div className="infra-title">
        Beyond
        <br />
        <span>localhost_</span>
      </div>
      <div className="infra-paths">
        <div className="infra-path">
          <span className="infra-label">MINECRAFT / TCP</span>
          <div className="infra-node">
            <Network size={18} />
            <span>VPS gateway</span>
          </div>
          <div className="infra-connector">
            <ArrowDown size={14} />
            <span>SSH reverse tunnel</span>
          </div>
          <div className="infra-node">
            <Server size={18} />
            <span>Home-hosted server</span>
          </div>
        </div>
        <div className="infra-path">
          <span className="infra-label">PALWORLD / UDP</span>
          <div className="infra-node">
            <Server size={18} />
            <span>Windows host</span>
          </div>
          <div className="infra-connector">
            <ArrowDown size={14} />
            <span>Docker Compose</span>
          </div>
          <div className="infra-node">
            <ShieldCheck size={18} />
            <span>Persistent game data</span>
          </div>
        </div>
      </div>
      <span className="scene-caption">
        TWO SETUPS. DIFFERENT ENGINEERING CHALLENGES.
      </span>
    </div>
  );
}

export function ProjectVisual({
  slug,
  large = false,
}: {
  slug: ProjectSlug;
  large?: boolean;
}) {
  const descriptions = {
    onboardhq:
      "Conceptual onboarding interface with a three-step workflow and a CRM connection.",
    "sabai-code":
      "Conceptual grocery mobile interface with illustrated produce. Not an original application screenshot.",
    "self-hosted-infrastructure":
      "Two separate hosting paths: Minecraft through a VPS and SSH tunnel; Palworld on a Windows host with Docker and persistent data.",
  };
  return (
    <div
      className={`project-visual visual-${slug} ${large ? "visual-large" : ""}`}
      role="img"
      aria-label={descriptions[slug]}
    >
      <div aria-hidden="true">
        {slug === "onboardhq" ? (
          <OnboardVisual />
        ) : slug === "sabai-code" ? (
          <GroceryVisual />
        ) : (
          <InfrastructureVisual />
        )}
      </div>
      <span className="concept-label" aria-hidden="true">
        Concept illustration
      </span>
    </div>
  );
}
