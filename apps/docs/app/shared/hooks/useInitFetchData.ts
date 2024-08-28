import { useState, useEffect } from "react";
import { useAppSelector } from "@shared/redux/store";
import { toast } from "@shared/hooks/useToast";

import { useFriends, useRankUsers } from "@server/_action/user-action";
import { useMembershipByUser } from "@server/_action/membership-action";
import {
  useExchanges,
  useExchangesByUser,
} from "@server/_action/exchanges-action";
import { useCategoryOfCardByUser } from "@server/_action/card-action";
import { useSkins } from "@server/_action/skin-action";
import { useEarnByUser } from "@server/_action/earn-action";

const useInitFetchData = (
  userInitAction: any,
  onComponentLoadComplete: () => void,
) => {
  const { initDataTelegram } = useAppSelector(
    (state) => state.app,
  );

  const [progress, setProgress] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const actions = [
    useExchanges(),
    useFriends(),
    useEarnByUser(),
    useSkins(),
    useCategoryOfCardByUser(),
    useExchangesByUser(),
    useMembershipByUser(),
    useRankUsers(),
  ];

  const urlParams = new URLSearchParams(window.location.search);
  const startAppParam = urlParams.get("startapp") ?? "";
  const matchResult = startAppParam.match(/\d+/);
  const startAppId = matchResult ? matchResult[0] : null;

  async function getUserRows(user: any) {
    return {
      telegram_id: String(user.id),
      username: user.username,
      photo_url: user.photo_url,
      first_name: user.first_name,
      last_name: user.last_name,
      is_bot: user.is_bot,
      is_premium: user.is_premium,
      language_code: user.language_code,
      reference_telegram_id: startAppId,
    };
  }

  const fetchData = async (user: any) => {
    try {
      const body = await getUserRows(user);
      const userData = await userInitAction.mutateAsync(body);

      if (!userData.data) {
        toast({
          variant: "error",
          title: "Expected user.data to be undefined",
        });
      }

      const totalTasks = actions.length;
      let completedTasks = 0;

      const tasks = actions
        .map((action, index) => {
          if (!action || !action.mutateAsync) {
            toast({
              variant: "error",
              title: `Action at index ${index} is not defined or does not have a mutateAsync method.`,
            });
            return null;
          }

          let params = {};
          switch (index) {
            case 0:
            case 1:
            case 2:
              params = { user_id: userData.data.id };
              break;
            case 3:
            case 4:
              params = {
                user_id: userData.data.id,
                exchange_id: userData.data.profitPerHour?.exchange_id || 51,
              };
              break;
            case 5:
            case 6:
            case 7:
              params = { user_id: userData.data.id };
              break;
            default:
              console.warn(`No specific params for action at index ${index}`);
          }

          return action
            .mutateAsync(params)
            .then((result: any) => {
              completedTasks += 1;
              setProgress((completedTasks / totalTasks) * 100);
            })
            .catch((error) => {
              toast({
                variant: "error",
                title: `Task ${index + 1} failed: ${error.message}`,
              });
            });
        })
        .filter(Boolean);

      await Promise.allSettled(tasks);

      setInitialized(true)
      onComponentLoadComplete();

    } catch (error) {
      console.error("Error initializing app:", error);
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      try {
        if (initDataTelegram) {
          await fetchData(initDataTelegram);
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    initializeApp();
  }, [initDataTelegram]);

  return { initialized, progress };
};

export default useInitFetchData;
