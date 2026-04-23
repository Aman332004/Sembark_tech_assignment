const BASE_URL = 'https://api.escuelajs.co/api/v1';

export const fetchProducts = async (categoryIds: number[] = []) => {
  if (categoryIds?.length === 0) {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  }

  const responses = await Promise.all(
    categoryIds?.map((id) =>
      fetch(`${BASE_URL}/products?categoryId=${id}`).then((res) => res.json()),
    ),
  );

  const merged = responses?.flat();
  const unique = Array.from(new Map(merged?.map((p) => [p.id, p])).values());
  return unique;
};

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  console.log('res>>>>>>>>', res);
  return res.json();
};
