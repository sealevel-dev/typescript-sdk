export type V2FirstPool = {
  id: string;
  createdAt: string;
};

export type V2AssetAudit = {
  mint_authority_disabled: boolean | null;
  freeze_authority_disabled: boolean | null;
  top_holders_percentage: number | null;
  dev_migration_count: number | null;
};

export type V2AssetStats = {
  price_change: number | null;
  holder_change: number | null;
  liquidity_change: number | null;
  volume_change: number | null;
  buy_volume: number | null;
  sell_volume: number | null;
  buy_organic_volume: number | null;
  sell_organic_volume: number | null;
  buy_count: number | null;
  sell_count: number | null;
  trader_count: number | null;
  organic_buyer_count: number | null;
  net_buyer_count: number | null;
};

export type V2Asset = {
  id: string;
  name: string;
  symbol: string;
  icon_url: string | null;
  decimals: number;
  twitter_url: string | null;
  website_url: string | null;
  dev_address: string | null;
  circulating_supply: number | null;
  total_supply: number | null;
  token_program_address: string;
  launchpad: string | null;
  partner_config_address: string | null;
  first_pool: V2FirstPool | null;
  holder_count: number | null;
  audit: V2AssetAudit | null;
  organic_score: number | null;
  organic_score_label: string | null;
  tags: string[];
  cexes: string[];
  graduated_pool_id: string | null;
  graduated_at: string | null;
  fdv: number | null;
  market_cap: number | null;
  price_usd: number | null;
  price_block_id: number | null;
  liquidity: number | null;
  stats_5m: V2AssetStats | null;
  stats_1h: V2AssetStats | null;
  stats_6h: V2AssetStats | null;
  stats_24h: V2AssetStats | null;
};

export type V2Pool = {
  id: string;
  chain: string;
  dex: string;
  type: string;
  quote_asset_mint: string | null;
  created_at: string | null;
  liquidity: number | null;
  volume_24h: number | null;
  updated_at: string | null;
  base_asset: V2Asset;
};

export type V2AssetPrice = {
  asset_mint: string;
  block_id: number;
  price_usd: number;
};

export type V2Transaction = {
  timestamp: string;
  asset_mint: string;
  type: string;
  price_usd: number;
  volume_usd: number;
  volume_native: number;
  trader_address: string;
  signature: string;
  amount: number;
  is_mev: boolean;
  is_mrp: boolean;
  is_valid_price: boolean;
  pool_id: string;
};
