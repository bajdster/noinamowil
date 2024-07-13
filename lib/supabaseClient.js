import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://mevyyzreknkmrisypxmd.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ldnl5enJla25rbXJpc3lweG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2NDUzMTcsImV4cCI6MjAzNjIyMTMxN30.f4b0sjsMHWIux2qHKhwrlGsW8-S792F8xEq2O_QKOvw"

const supabase = createClient(supabaseUrl, supabaseKey, {
    localStorage: AsyncStorage
  });

  

export default supabase
