-- Update the function to handle the new metadata structure from signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, company, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name', 
      NEW.raw_user_meta_data ->> 'name',
      ''
    ),
    COALESCE(
      NEW.raw_user_meta_data ->> 'avatar_url', 
      NEW.raw_user_meta_data ->> 'picture', 
      ''
    ),
    COALESCE(NEW.raw_user_meta_data ->> 'company', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'role', '')
  );
  RETURN NEW;
END;
$$;