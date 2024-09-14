import supabase from "./supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getRecipes()
{
    const {data, error} = await supabase
    .from('drinks')
    .select('category, title, main_alcohol, image_url, id')
    if(error) console.error("Error occured", error.message)
    return {data, error}
}

export async function getRecipe(id)
{
    const {data, error} = await supabase
    .from("drinks")
    .select("*")
    .eq("id", id)
    if(error) console.error("Error occured", error.message)
    return {data, error}
}

export const loadSession = async () => {

    let savedSession;
    try {
        const sessionString = await AsyncStorage.getItem('session');
        if (sessionString) {
            savedSession = JSON.parse(sessionString);
            console.log('Session loaded from AsyncStorage:', savedSession);
        } else {
            console.log('No session found in AsyncStorage');
        }
    } catch (error) {
        console.error('Error loading session:', error);
    }
    return savedSession;
};

//umożliwienie logowania/rejestracji za pomocą google 
// Jeśli chcesz dodać możliwość **logowania lub rejestracji za pomocą konta Google** do swojej aplikacji przy użyciu Supabase, kroki są podobne do tego, co już opisałem. Przejdę przez pełną konfigurację od strony Twojej aplikacji.

// ### 1. **Konfiguracja Google API dla Twojej aplikacji**

// Musisz skonfigurować Google OAuth w [Google Cloud Console](https://console.cloud.google.com/), aby Twoja aplikacja mogła uwierzytelniać użytkowników przez konto Google.

// #### Kroki:
// 1. **Zaloguj się do Google Cloud Console**.
// 2. **Utwórz projekt** lub wybierz istniejący projekt.
// 3. Przejdź do **API & Services** > **Credentials**.
// 4. Kliknij **Create Credentials** i wybierz **OAuth 2.0 Client IDs**.
// 5. Skonfiguruj ekran zgody OAuth:
//    - Nazwa aplikacji.
//    - Dodaj domeny, jeśli są wymagane.
//    - Wypełnij wymagane pola, np. kontaktowe informacje.
// 6. Utwórz nowe **Client ID**:
//    - Typ aplikacji: **Web Application**.
//    - W sekcji **Authorized redirect URIs**, dodaj URL przekierowania w formacie:
//      ```
//      https://<your-project-id>.supabase.co/auth/v1/callback
//      ```
// 7. Zanotuj **Client ID** i **Client Secret**.

// ### 2. **Konfiguracja Google OAuth w Supabase**

// Teraz musisz skonfigurować Google OAuth w panelu Supabase:

// 1. Zaloguj się do [Supabase Dashboard](https://app.supabase.com/).
// 2. Wybierz swój projekt.
// 3. Przejdź do **Authentication** > **Settings**.
// 4. W sekcji **External OAuth Providers**, znajdź **Google** i wprowadź tam:
//    - **Client ID** (z Google Cloud Console).
//    - **Client Secret** (z Google Cloud Console).
// 5. Zapisz zmiany.

// ### 3. **Implementacja logowania w aplikacji**

// Po skonfigurowaniu Google OAuth w Supabase, możesz dodać logowanie za pomocą Google do swojej aplikacji.

// #### Instalacja Supabase SDK:
// Jeśli jeszcze nie masz zainstalowanego `supabase-js`, zainstaluj go w swoim projekcie:

// ```bash
// npm install @supabase/supabase-js
// ```

// #### Konfiguracja klienta Supabase:

// Utwórz plik `supabaseClient.js`, aby skonfigurować połączenie z Supabase:

// ```javascript
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://<your-project-id>.supabase.co';
// const supabaseAnonKey = '<your-anon-key>';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
// ```

// #### Dodanie funkcji logowania przez Google:

// W aplikacji możesz teraz dodać funkcję logowania. W React wyglądałoby to tak:

// ```javascript
// import React from 'react';
// import { supabase } from './supabaseClient';

// const Login = () => {
//   const signInWithGoogle = async () => {
//     const { error } = await supabase.auth.signInWithOAuth({
//       provider: 'google',
//     });

//     if (error) {
//       console.error('Error during Google login', error.message);
//     }
//   };

//   return (
//     <div>
//       <button onClick={signInWithGoogle}>Zaloguj się z Google</button>
//     </div>
//   );
// };

// export default Login;
// ```

// #### Logika logowania:

// - Funkcja `supabase.auth.signInWithOAuth({ provider: 'google' })` otwiera okno logowania przez Google. Po zatwierdzeniu użytkownik zostanie automatycznie zalogowany lub zarejestrowany.
// - Po poprawnym zalogowaniu, Supabase automatycznie zarządza sesją użytkownika.

// ### 4. **Obsługa sesji użytkownika**

// Po zalogowaniu możesz sprawdzić, czy użytkownik jest zalogowany, i pobrać dane użytkownika:

// ```javascript
// import React, { useEffect, useState } from 'react';
// import { supabase } from './supabaseClient';

// const UserProfile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const session = supabase.auth.session();
//     setUser(session?.user);

//     // Możesz również subskrybować zmiany w stanie sesji:
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user || null);
//     });

//     return () => {
//       authListener.unsubscribe();
//     };
//   }, []);

//   return (
//     <div>
//       {user ? <p>Witaj, {user.email}</p> : <p>Nie jesteś zalogowany</p>}
//     </div>
//   );
// };

// export default UserProfile;
// ```

// ### 5. **Testowanie**

// 1. Uruchom aplikację i kliknij przycisk **"Zaloguj się z Google"**.
// 2. Przekierowanie na stronę Google i autoryzacja powinny zakończyć się sukcesem.
// 3. Po autoryzacji użytkownik zostanie przekierowany z powrotem do Twojej aplikacji.

// ### Dodatkowe informacje:

// - Możesz w Supabase skonfigurować również inne zewnętrzne dostawców logowania, jak Facebook czy GitHub, podobnie jak dla Google.
// - Jeśli chcesz skonfigurować przekierowania po logowaniu, możesz ustawić je w **Supabase Auth Settings**.

// W ten sposób dodasz możliwość logowania i rejestracji przez Google do swojej aplikacji.