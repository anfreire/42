import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ComponentsProvider } from "./common/Components/index.tsx";
import { SocketProvider } from "./common/Socket/index.tsx";
import { UserProvider } from "./services/User/index.tsx";
import { NotificationsProvider } from "./services/Notifications/index.tsx";
import { ConversationsProvider } from "./services/Conversations/index.tsx";
import { SocialProvider } from "./services/Social/context/social.context.tsx";
import { FullScreenProvider, GameProvider } from "./services/Game/index.tsx";
import { ThemeProvider } from "./common/Theme/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ComponentsProvider>
      <SocketProvider>
        <UserProvider>
          <NotificationsProvider>
            <ConversationsProvider>
              <SocialProvider>
                <GameProvider>
                  <FullScreenProvider>
                    <App />
                  </FullScreenProvider>
                </GameProvider>
              </SocialProvider>
            </ConversationsProvider>
          </NotificationsProvider>
        </UserProvider>
      </SocketProvider>
    </ComponentsProvider>
  </ThemeProvider>
);
